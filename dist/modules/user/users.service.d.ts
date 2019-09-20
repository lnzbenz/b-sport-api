import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly user;
    constructor(user: Repository<User>);
    find($params?: {}): Promise<User[]>;
    save($params: any): Promise<User[] | User>;
    saveOne($params: any): Promise<User>;
    create($params: any): Promise<any>;
    findOne($params?: {}): Promise<User>;
    delete($params: any): Promise<User[] | User>;
    queryBuilder($where?: string, $relations?: any[], $order?: any[]): Promise<User[]>;
    genKey(len?: number): Promise<string>;
}
