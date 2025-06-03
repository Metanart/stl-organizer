import { RequestHandler } from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'

import { DBSource } from '../db/db-source'
import { PathEntity } from '../db/entities/PathEntity'
import { generateImagesMap } from '../scan/generate-images-map'
import { prepareModelDirectory } from '../scan/prepare-model-directory'
import { scanFullTree } from '../scan/scan-full-tree'
import { OUTPUT_ROOT } from './config'

export type FileCategory = 'folder' | 'archive' | 'image' | 'file'

export interface FileNode {
  name: string
  type: string // extension without dot, lowercase
  category: FileCategory
  path: string // absolute path
  children: FileNode[] | null
  windowsPath?: string // добавим этот путь
}

type ImageSource = 'external' | 'internal'

type ArchiveImageMap = Record<
  string,
  {
    fileName: string
    images: { path: string; source: ImageSource }[]
  }
>

type FolderResult = {
  folder: string
  archives: {
    name: string
    images: string[]
  }[]
  imagesMap: ArchiveImageMap
  folderTree: FileNode
}

type PreparedModelDirectory = {
  name: string
  safeName: string
  archive: {
    name: string
    fullPath: string
    type: string
  }
  images: Array<{
    name: string
    fullPath: string
  }>
  modelDir: string
}

function normalizePath(input: string): string {
  // E:\Folder\Subfolder -> /mnt/e/Folder/Subfolder
  if (/^[A-Z]:\\/.test(input)) {
    const driveLetter = input[0].toLowerCase()
    const rest = input.slice(2).replace(/\\/g, '/')
    return `/mnt/${driveLetter}${rest}`
  }
  return input
}

function normalizeName(fileName: string): string {
  return path
    .parse(fileName)
    .name.trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '')
}

export const scanPreviewHandler: RequestHandler = async (request, response) => {
  let folderResult: FolderResult = undefined

  try {
    const repo = DBSource.getRepository(PathEntity)
    const paths = await repo.find()

    for (const { path: basicPath } of paths) {
      const folderPath = normalizePath(basicPath) // Convert Windows paths for WSL

      console.log(`🔍 Scanning folder: ${folderPath}`)

      try {
        const files = await fs.readdir(folderPath)
        const archives = files.filter((name) => /\.(zip|rar|7z|tar|gz)$/i.test(name))
        const images = files.filter((name) => /\.(png|jpe?g|webp)$/i.test(name))

        const archiveEntries = archives.map((archive) => {
          const archiveName = path.parse(archive).name
          const normalizedArchiveName = normalizeName(archiveName)

          const matchingImages = images.filter((img) => {
            const normalizedImg = normalizeName(img)
            return normalizedImg.includes(normalizedArchiveName)
          })

          return {
            name: archive,
            images: matchingImages
          }
        })

        const folderTree = await scanFullTree(folderPath)

        const imagesMap = generateImagesMap(folderTree)

        folderResult = {
          folder: folderPath,
          folderTree,
          imagesMap,
          archives: archiveEntries
        }

        // Transfer
        try {
          const result: PreparedModelDirectory[] = []

          for (const [safeName, entry] of Object.entries(folderResult.imagesMap)) {
            const archiveFullPath = folderResult.folderTree.children?.find(
              (child) => child.category === 'archive' && child.name === entry.fileName
            )?.path

            if (!archiveFullPath) {
              console.warn(`Archive path not found for ${safeName}`)
              continue
            }

            console.log('⚙️ Processing model:', entry.fileName)

            const externalImages = entry.images
              .filter((img) => img.source === 'external')
              .map((img) => img.path)

            const prepared: PreparedModelDirectory = await prepareModelDirectory({
              safeName,
              archivePath: archiveFullPath,
              externalImages,
              outputRoot: OUTPUT_ROOT
            })

            result.push(prepared)
          }

          const transferredResultTree = await scanFullTree(OUTPUT_ROOT)

          response.status(200).json({
            folderResult,
            transferredResult: {
              result,
              transferredResultTree
            }
          })
          return
        } catch (error) {
          console.error('Transfer failed:', error)

          response.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : String(error)
          })
          return
        }
      } catch (err) {
        console.warn(`⚠️ Failed to scan ${folderPath}:`, err.message)
      }
    }

    response.json({ folderResult })
    return
  } catch (error) {
    console.error('Scan preview failed:', error)
    response.status(500).json({ message: 'Scan preview failed' })
    return
  }
}
