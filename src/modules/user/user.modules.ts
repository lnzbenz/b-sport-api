import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.modules';
import { UserProvider } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { MailService } from '../mail/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...UserProvider, UserService],
  // MailService
  exports: [UserService],
})
export class UserModule {}