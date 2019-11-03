import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.modules';
import { StoreProvider } from './store.provider';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
// import { MailService } from '../mail/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [...StoreProvider, StoreService],
  // MailService
  exports: [StoreService],
})
export class StoreModule {}