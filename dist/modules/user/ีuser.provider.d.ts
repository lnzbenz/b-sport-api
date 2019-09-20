import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';
export declare const UserProvider: {
    provide: string;
    useFactory: (con: Connection) => Repository<User>;
    inject: string[];
}[];
