import { DataSource } from 'typeorm';
import { PathEntity } from './entities/PathEntity';
import { ConfigEntity } from './entities/ConfigEntity';

export const DBSource = new DataSource({
    type: 'sqlite',
    database: './stl.db',
    synchronize: true, // ⚠️ Только для dev!
    entities: [PathEntity, ConfigEntity],
});
