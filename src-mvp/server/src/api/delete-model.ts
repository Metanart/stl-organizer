// handlers/deleteModelHandler.ts
import { Request, Response, RequestHandler } from 'express';
import fs from 'node:fs/promises';
import { OUTPUT_SORTING_ROOT } from './config';

export const deleteModelHandler: RequestHandler = async (
    request: Request,
    response: Response,
) => {
    const { path: modelPath } = request.query;

    if (typeof modelPath !== 'string') {
        response.status(400).json({ message: 'Missing model path' });
        return;
    }

    const decodedPath = decodeURIComponent(modelPath);

    if (!decodedPath.startsWith(OUTPUT_SORTING_ROOT)) {
        response.status(403).json({ message: 'Access denied' });
        return;
    }

    try {
        await fs.rm(decodedPath, { recursive: true, force: true });
        console.log(`🗑️ Deleted model at: ${decodedPath}`);
        response.status(200).json({ message: 'Model deleted' });
        return;
    } catch (err) {
        console.error(`❌ Failed to delete ${decodedPath}`, err);
        response.status(500).json({ message: 'Deletion failed' });
        return;
    }
};
