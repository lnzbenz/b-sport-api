import { Connection , Repository } from 'typeorm';
import { Store } from './store.entity';

export const StoreProvider = [
  {
    provide: 'StoreToken',
    useFactory: (con: Connection) => con.getRepository(Store),
    inject: ['DbConnectionToken'],
  },
];