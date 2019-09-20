"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let UserService = class UserService {
    constructor(user) {
        this.user = user;
    }
    async find($params = {}) {
        return this.user.find($params);
    }
    async save($params) {
        return this.user.save($params);
    }
    async saveOne($params) {
        return this.user.save($params);
    }
    async create($params) {
        return this.user.save($params);
    }
    async findOne($params = {}) {
        return this.user.findOne($params);
    }
    async delete($params) {
        const user = await this.user.findOne({
            where: $params,
        });
        if (user) {
            user.isDisable = await true;
            return await this.user.save(user);
        }
    }
    async queryBuilder($where = '', $relations = [], $order = []) {
        let query = await this.user.createQueryBuilder('user');
        if ($where) {
            query = query.where($where);
        }
        if ($relations.length) {
            $relations.map($objRelation => {
                query = query.leftJoinAndSelect($objRelation.field, $objRelation.alias);
            });
        }
        if ($order.length) {
            $order.map(($objOrder, $index) => {
                if (!$index) {
                    query = query.orderBy($objOrder.field, $objOrder.direction);
                }
                else {
                    query = query.addOrderBy($objOrder.field, $objOrder.direction);
                }
            });
        }
        return query.getMany();
    }
    async genKey(len = 80) {
        let name = await '';
        let possible = await 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < len; i++) {
            name += await possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return name;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('UserToken')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map