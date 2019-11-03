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
const store_service_1 = require("./store.service");
const swagger_1 = require("@nestjs/swagger");
var sha512 = require('js-sha512');
let StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    async findAll($req, $res) {
        try {
            let where = await `store.isDisable = false`;
            let relations = await [];
            let order = await [];
            let storeData = await this.storeService.queryBuilder(where);
            await $res.status(common_1.HttpStatus.OK).json(storeData);
        }
        catch ($ex) {
            await $res.status(common_1.HttpStatus.OK).json({ message: 'Error' });
        }
    }
    async findAllstores($req, $res) {
        try {
            let where = await `store.isDisable = false`;
            let relations = await [];
            let order = await [
                {
                    field: 'id',
                    direction: 'DESC'
                }
            ];
            let storeData = await this.storeService.queryBuilder(where, relations, order);
            await $res.status(common_1.HttpStatus.OK).json(storeData);
        }
        catch ($ex) {
            await $res.status(common_1.HttpStatus.OK).json({ message: 'Error' });
        }
    }
    async createStore($body, $res) {
        try {
            console.log('ข้อมูลที่ถูกสร้าง --------> ', $body);
            let stores = await Object.assign({}, $body);
            stores = await this.storeService.saveOne(stores);
            await $res.status(common_1.HttpStatus.OK).json(stores);
        }
        catch ($ex) {
            await $res
                .status(common_1.HttpStatus.OK)
                .json({ message: 'Please fill password to same of both' });
        }
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "findAll", null);
__decorate([
    common_1.Get('allstore'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "findAllstores", null);
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "createStore", null);
StoreController = __decorate([
    swagger_1.ApiUseTags('store'),
    common_1.Controller('store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
exports.StoreController = StoreController;
//# sourceMappingURL=store.controller.js.map