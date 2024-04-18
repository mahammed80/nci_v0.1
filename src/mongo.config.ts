// mongo.config.ts
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongoConfig: MongooseModuleOptions = {
  uri: 'mongodb://localhost:27017',
};
