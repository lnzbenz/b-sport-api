import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll($req: any, $res: any): Promise<void>;
    findAllusers($req: any, $res: any): Promise<void>;
    createUser($body: any, $res: any): Promise<void>;
    login($body: any, $res: any): Promise<void>;
}
