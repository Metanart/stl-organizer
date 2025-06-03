import express from 'express';
import cors from 'cors';

import { DBSource } from './db/db-source';
import {
    addPathHandler,
    deletePathHandler,
    getPathsHandler,
} from './api/paths-api';
import { getConfigHandler, saveConfigHandler } from './api/config-api';
import { scanPreviewHandler } from './api/scan-api';

import { getModelsHandler } from './api/models-api';
import { getImageHandler } from './api/image-api';
import { deleteModelHandler } from './api/delete-model';
import { generateGalleryJsonHandler } from './api/generate-gallery-json';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/paths', getPathsHandler);
app.post('/api/paths', addPathHandler);
app.delete('/api/paths/:id', deletePathHandler);

app.get('/api/config', getConfigHandler);
app.post('/api/config', saveConfigHandler);

app.get('/api/scan-preview', scanPreviewHandler);

app.get('/api/models', getModelsHandler);

app.get('/api/image', getImageHandler);

app.delete('/api/model', deleteModelHandler);

app.get('/api/generate-gallery-json', generateGalleryJsonHandler);

async function main() {
    try {
        await DBSource.initialize();
        console.log('✅ Database connected');

        app.listen(3001, () => {
            console.log('🚀 Server running on http://localhost:3001');
        });
    } catch (err) {
        console.error('❌ Failed to initialize DB:', err);
        process.exit(1);
    }
}

main();
