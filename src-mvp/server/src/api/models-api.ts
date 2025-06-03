import path from 'node:path';
import fs from 'node:fs/promises';
import { CACHE_FILENAME } from '../scan/scan-full-tree';
import { Request, Response, RequestHandler } from 'express';
import { OUTPUT_SORTING_ROOT } from './config';

export const getModelsHandler: RequestHandler = async (
    request: Request,
    response: Response,
) => {
    const cachePath = path.join(OUTPUT_SORTING_ROOT, CACHE_FILENAME);

    try {
        const cachedData = await fs.readFile(cachePath, 'utf-8');
        console.warn(`✅ Get cache from ${cachePath}`);

        // отправляем ответ
        response.json(JSON.parse(cachedData));
        return;
    } catch (error) {
        console.error('Getting models cache failed:', error);

        response.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : String(error),
        });
        return;
    }
};
