import { RequestHandler, Request, Response } from 'express';
import { scanFullTree } from '../scan/scan-full-tree';
import { OUTPUT_SORTING_ROOT } from './config';

export const generateGalleryJsonHandler: RequestHandler = async (
    request: Request,
    response: Response,
) => {
    try {
        const transferredResultTree = await scanFullTree(
            OUTPUT_SORTING_ROOT,
            true,
        );

        response.status(200).json({
            transferredResultTree,
        });

        return;
    } catch (error) {
        console.error('Generation failed:', error);

        response.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : String(error),
        });

        return;
    }
};
