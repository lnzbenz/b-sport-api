import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.modules';
import { UserModule } from './modules/user/user.modules'
import { StoreModule } from './modules/store/store.modules'
@Module({
  imports: [DatabaseModule, UserModule,StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
