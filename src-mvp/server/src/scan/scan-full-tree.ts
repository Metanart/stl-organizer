import fs from 'node:fs/promises';
import path from 'node:path';
import StreamZip from 'node-stream-zip';
import { createExtractorFromFile } from 'node-unrar-js';
import { toWindowsPath } from '../utils/to-windows-path';

export type FileCategory = 'folder' | 'archive' | 'image' | 'file';

export interface FileNode {
    name: string;
    type: string; // extension without dot, lowercase
    category: FileCategory;
    path: string; // absolute path
    children: FileNode[] | null;
    windowsPath?: string; // добавим этот путь
}

function getCategory(ext: string, isDir: boolean): FileCategory {
    if (isDir) return 'folder';
    if (['zip', 'rar'].includes(ext)) return 'archive';
    if (['png', 'jpg', 'jpeg', 'webp'].includes(ext)) return 'image';
    return 'file';
}

function getExtension(filePath: string): string {
    return path.extname(filePath).slice(1).toLowerCase();
}

export const CACHE_FILENAME = 'folder-tree.json';

export async function scanFullTree(rootPath: string, isForce = false) {
    const cachePath = path.join(rootPath, CACHE_FILENAME);

    if (!isForce) {
        // Если есть кэш — вернуть его
        try {
            const cachedData = await fs.readFile(cachePath, 'utf-8');
            console.warn(`✅ Get cache from ${cachePath}`);
            return JSON.parse(cachedData);
        } catch {
            // нет файла — продолжаем анализ
        }
    }

    const tree = await traverseTree(rootPath);

    // Сохраняем в кэш
    try {
        await fs.writeFile(cachePath, JSON.stringify(tree, null, 2), 'utf-8');
        console.warn(`🚀 Created cache for ${cachePath}`);
    } catch (err) {
        console.warn(`❌ Failed to write cache to ${cachePath}:`, err);
    }

    return tree;
}

export async function traverseTree(entryPath: string): Promise<FileNode> {
    const stats = await fs.stat(entryPath);
    const isDir = stats.isDirectory();
    const ext = getExtension(entryPath);
    const category = getCategory(ext, isDir);
    const result: FileNode = {
        name: path.basename(entryPath),
        type: isDir ? '' : ext,
        category,
        path: entryPath,
        children: null,
        windowsPath: toWindowsPath(entryPath),
    };

    if (category === 'folder') {
        const entries = await fs.readdir(entryPath);
        result.children = [];
        for (const name of entries) {
            const childPath = path.join(entryPath, name);
            try {
                const childNode = await traverseTree(childPath);
                result.children.push(childNode);
            } catch (err) {
                console.warn(
                    `⚠️ Failed to scan ${childPath}:`,
                    (err as Error).message,
                );
            }
        }
    } else if (category === 'archive' && ext === 'zip') {
        try {
            const zip = new StreamZip.async({ file: entryPath });
            const entries = await zip.entries();
            result.children = Object.values(entries).map((entry) => {
                const fileExt = path.extname(entry.name).slice(1).toLowerCase();
                const isDir = entry.isDirectory;
                const category = getCategory(fileExt, isDir);
                return {
                    name: path.basename(entry.name),
                    type: isDir ? '' : fileExt,
                    category,
                    size: isDir
                        ? null
                        : parseFloat((entry.size / (1024 * 1024)).toFixed(2)),
                    path: path.join(entryPath, entry.name),
                    children: null,
                    windowsPath: toWindowsPath(entryPath),
                };
            });
            await zip.close();
        } catch (err) {
            console.warn(
                `⚠️ Failed to read zip ${entryPath}:`,
                (err as Error).message,
            );
        }
    } else if (category === 'archive' && ext === 'rar') {
        try {
            const extractor = await createExtractorFromFile({
                filepath: entryPath,
            });
            const { fileHeaders } = extractor.getFileList();
            result.children = [];

            for (const header of fileHeaders) {
                const fileExt = path
                    .extname(header.name)
                    .slice(1)
                    .toLowerCase();
                const isDir = header.flags.directory;
                const category = getCategory(fileExt, isDir);
                result.children.push({
                    name: path.basename(header.name),
                    type: isDir ? '' : fileExt,
                    category,
                    path: path.join(entryPath, header.name),
                    children: null,
                    windowsPath: toWindowsPath(
                        path.join(entryPath, header.name),
                    ),
                });
            }
        } catch (err) {
            console.warn(
                `⚠️ Failed to read rar ${entryPath}:`,
                (err as Error).message,
            );
        }
    }

    return result;
}
