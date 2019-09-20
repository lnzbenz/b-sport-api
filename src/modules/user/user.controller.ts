import {
    Controller,
    Req,
    Res,
    HttpStatus,
    Body,
    Get,
    Post,
    Put,
    Param,
    Delete,
    HttpCode,
    UseInterceptors,
    // FileInterceptor,
    UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AppConfigure } from '../../configures/global.configure';
var sha512 = require('js-sha512');
import * as jwt from 'jsonwebtoken';

// import { diskStorage } from 'multer';
// import * as path from 'path';
// import * as _ from 'lodash';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    async findAll(@Req() $req, @Res() $res) {
        try {
            let where = await `user.isDisable = false`;
            let relations = await [];
            let order = await [];

            let userData = await this.userService.queryBuilder(
                where,
                // relations,
                // order,
            );

            await $res.status(HttpStatus.OK).json(userData);
        } catch ($ex) {
            await $res.status(HttpStatus.OK).json({ message: 'Error' });
        }
    }

    @Get('alluser')
    async findAllusers(@Req() $req, @Res() $res) {
        try {
            let where = await `user.isDisable = false && user.role = 'user' `;
            let relations = await [];
            let order = await [];
            let userData = await this.userService.queryBuilder(
                where,
                // relations,
                // order,
            );

            await $res.status(HttpStatus.OK).json(userData);
        } catch ($ex) {
            await $res.status(HttpStatus.OK).json({ message: 'Error' });
        }
    }

    @Post('create')
    async createUser(@Body() $body, @Res() $res) {
        try {
            // if ($body.id) {
            //   $body.id = await parseInt($body.id.toString());
            // }
            console.log('ข้อมูลที่ถูกสร้าง --------> ', $body);

            let users = await Object.assign({}, $body);

            users.password = await sha512
                .update($body['password'])
                .update(AppConfigure.hkey)
                .hex();

            console.log('sha .... ', users.password);

            users = await this.userService.saveOne(users);
            await $res.status(HttpStatus.OK).json(users);
        } catch ($ex) {
            await $res
                .status(HttpStatus.OK)
                .json({ message: 'Please fill password to same of both' });
        }
    }

    @Post('login')
    async login(@Body() $body, @Res() $res) {
        try {
            console.log('ข้อมูลผู้ใช้ : ', $body); //แสดงข้อมูลของ  $body

            let user = await this.userService.findOne({
                where: {
                    email: $body['email'],
                },
            });

            if (user) {
                if (
                    user.password ==
                    (await sha512
                        .update($body['password'])
                        .update(AppConfigure.hkey)
                        .hex())
                ) {
                    let token = jwt.sign(
                        {
                            id: user.id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            role: user.role,
                            email: user.email,
                            phone: user.phone,
                            address: user.address,
                        },
                        'shhhhh',
                        { expiresIn: '24h' },
                    );
                    console.log('token : ', token);
                    await $res.status(HttpStatus.OK).json({ token });
                } else {
                    await $res
                        .status(HttpStatus.OK)
                        .json({ message: 'Invalid password' });
                }
            } else {
                await $res.status(HttpStatus.OK).json({ message: 'Email not found' });
            }
        } catch ($ex) {
            await $res
                .status(HttpStatus.OK)
                .json({ message: 'Email or Password Invalid' });
        }
    }
}