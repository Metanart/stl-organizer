import { Request, RequestHandler, Response } from 'express'
import fs from 'node:fs/promises'

export const getImageHandler: RequestHandler = async (request: Request, response: Response) => {
  console.log('Requested image', request.query.path)

  const encodedPath = request.query.path
  if (typeof encodedPath !== 'string') {
    response.status(400).json({ message: 'Missing image path' })
    return
  }

  // Декодируем путь из URL-параметра
  const absolutePath = decodeURIComponent(encodedPath)

  try {
    // Проверим, что файл существует
    await fs.access(absolutePath)
    response.sendFile(absolutePath)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.warn(`❌ Image not found: ${absolutePath}`)
    response.status(404).json({ message: 'Image not found' })
  }
}
