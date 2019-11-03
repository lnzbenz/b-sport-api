import { Connection, Repository } from 'typeorm';
import { Store } from './store.entity';
export declare const StoreProvider: {
    provide: string;
    useFactory: (con: Connection) => Repository<Store>;
    inject: string[];
}[];
