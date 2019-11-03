import { StoreService } from './store.service';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    findAll($req: any, $res: any): Promise<void>;
    findAllstores($req: any, $res: any): Promise<void>;
    createStore($body: any, $res: any): Promise<void>;
}
