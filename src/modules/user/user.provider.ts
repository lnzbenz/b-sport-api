import { Connection , Repository } from 'typeorm';
import { User } from './user.entity';

export const UserProvider = [
  {
    provide: 'UserToken',
    useFactory: (con: Connection) => con.getRepository(User),
    inject: ['DbConnectionToken'],
  },
];