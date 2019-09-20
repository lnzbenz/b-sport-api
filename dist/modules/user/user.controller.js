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
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const global_configure_1 = require("../../configures/global.configure");
var sha512 = require('js-sha512');
const jwt = require("jsonwebtoken");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll($req, $res) {
        try {
            let where = await `user.isDisable = false`;
            let relations = await [];
            let order = await [];
            let userData = await this.userService.queryBuilder(where);
            await $res.status(common_1.HttpStatus.OK).json(userData);
        }
        catch ($ex) {
            await $res.status(common_1.HttpStatus.OK).json({ message: 'Error' });
        }
    }
    async findAllusers($req, $res) {
        try {
            let where = await `user.isDisable = false && user.role = 'user' `;
            let relations = await [];
            let order = await [];
            let userData = await this.userService.queryBuilder(where);
            await $res.status(common_1.HttpStatus.OK).json(userData);
        }
        catch ($ex) {
            await $res.status(common_1.HttpStatus.OK).json({ message: 'Error' });
        }
    }
    async createUser($body, $res) {
        try {
            console.log('ข้อมูลที่ถูกสร้าง --------> ', $body);
            let users = await Object.assign({}, $body);
            users.password = await sha512
                .update($body['password'])
                .update(global_configure_1.AppConfigure.hkey)
                .hex();
            console.log('sha .... ', users.password);
            users = await this.userService.saveOne(users);
            await $res.status(common_1.HttpStatus.OK).json(users);
        }
        catch ($ex) {
            await $res
                .status(common_1.HttpStatus.OK)
                .json({ message: 'Please fill password to same of both' });
        }
    }
    async login($body, $res) {
        try {
            console.log('ข้อมูลผู้ใช้ : ', $body);
            let user = await this.userService.findOne({
                where: {
                    email: $body['email'],
                },
            });
            if (user) {
                if (user.password ==
                    (await sha512
                        .update($body['password'])
                        .update(global_configure_1.AppConfigure.hkey)
                        .hex())) {
                    let token = jwt.sign({
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        role: user.role,
                        email: user.email,
                        phone: user.phone,
                        address: user.address,
                    }, 'shhhhh', { expiresIn: '24h' });
                    console.log('token : ', token);
                    await $res.status(common_1.HttpStatus.OK).json({ token });
                }
                else {
                    await $res
                        .status(common_1.HttpStatus.OK)
                        .json({ message: 'Invalid password' });
                }
            }
            else {
                await $res.status(common_1.HttpStatus.OK).json({ message: 'Email not found' });
            }
        }
        catch ($ex) {
            await $res
                .status(common_1.HttpStatus.OK)
                .json({ message: 'Email or Password Invalid' });
        }
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    common_1.Get('alluser'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllusers", null);
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    swagger_1.ApiUseTags('user'),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map