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
import { StoreService } from './store.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AppConfigure } from '../../configures/global.configure';
var sha512 = require('js-sha512');
import * as jwt from 'jsonwebtoken';

// import { diskStorage } from 'multer';
// import * as path from 'path';
// import * as _ from 'lodash';

@ApiUseTags('store')
@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) { }
    @Get()
    async findAll(@Req() $req, @Res() $res) {
        try {
            let where = await `store.isDisable = false`;
            let relations = await [];
            let order = await [];

            let storeData = await this.storeService.queryBuilder(
                where,
                // relations,
                // order,
            );

            await $res.status(HttpStatus.OK).json(storeData);
        } catch ($ex) {
            await $res.status(HttpStatus.OK).json({ message: 'Error' });
        }
    }

    @Get('allstore')
    async findAllstores(@Req() $req, @Res() $res) {
        try {
            let where = await `store.isDisable = false`;
            let relations = await [];
            let order = await [
                {
                    field: 'id',
                    direction: 'DESC'
                }
            ]
            
            let storeData = await this.storeService.queryBuilder(
                where,
                relations,
                order
            );

            await $res.status(HttpStatus.OK).json(storeData);
        } catch ($ex) {
            await $res.status(HttpStatus.OK).json({ message: 'Error' });
        }
    }

    @Post('create')
    async createStore(@Body() $body, @Res() $res) {
        try {
            // if ($body.id) {
            //   $body.id = await parseInt($body.id.toString());
            // }
            console.log('ข้อมูลที่ถูกสร้าง --------> ', $body);

            let stores = await Object.assign({}, $body);

            stores = await this.storeService.saveOne(stores);
            await $res.status(HttpStatus.OK).json(stores);
        } catch ($ex) {
            await $res
                .status(HttpStatus.OK)
                .json({ message: 'Please fill password to same of both' });
        }
    }

    
}