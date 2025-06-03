import { PathEntity } from '../db/entities/PathEntity';
import { Request, Response, RequestHandler } from 'express';

import { DBSource } from '../db/db-source';

export const getPathsHandler: RequestHandler = async (
    request: Request,
    response: Response,
) => {
    try {
        const repo = DBSource.getRepository(PathEntity);
        const all = await repo.find();
        response.json(all);
        return;
    } catch (error) {
        console.error('DB query failed:', error);
        response.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : String(error),
        });
        return;
    }
};

export const addPathHandler: RequestHandler = async (
    request: Request,
    response: Response,
) => {
    const { path } = request.body;

    if (typeof path !== 'string' || !path.trim()) {
        response
            .status(400)
            .json({ message: 'Path must be a non-empty string' });
        return;
    }

    try {
        const repo = DBSource.getRepository(PathEntity);
        const newPath = repo.create({ path });
        const saved = await repo.save(newPath);
        response.status(201).json(saved);
        return;
    } catch (error) {
        console.error('DB insert failed:', error);
        response.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : String(error),
        });
        return;
    }
};

export const deletePathHandler: RequestHandler = async (
    request: Request,
    response: Response,
) => {
    const id = parseInt(request.params.id, 10);

    if (isNaN(id)) {
        response.status(400).json({ message: 'Invalid ID' });
        return;
    }

    try {
        const repo = DBSource.getRepository(PathEntity);
        const pathToDelete = await repo.findOneBy({ id });

        if (!pathToDelete) {
            response.status(404).json({ message: 'Path not found' });
            return;
        }

        await repo.remove(pathToDelete);
        response.json({ message: 'Path deleted' });
    } catch (error) {
        console.error('DB delete failed:', error);
        response.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : String(error),
        });
        return;
    }
};
