import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';

const configService = new ConfigService();
export default new DataSource(getTypeOrmConfig(configService));
