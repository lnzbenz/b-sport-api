import { Repository } from 'typeorm';
import { Store } from './store.entity';
export declare class StoreService {
    private readonly user;
    constructor(user: Repository<Store>);
    find($params?: {}): Promise<Store[]>;
    save($params: any): Promise<Store[] | Store>;
    saveOne($params: any): Promise<Store>;
    create($params: any): Promise<any>;
    findOne($params?: {}): Promise<Store>;
    delete($params: any): Promise<Store[] | Store>;
    queryBuilder($where?: string, $relations?: any[], $order?: any[]): Promise<Store[]>;
    genKey(len?: number): Promise<string>;
}
