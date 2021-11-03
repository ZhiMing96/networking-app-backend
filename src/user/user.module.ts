import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Country } from './entities/country.entities';
import { FriendRequest } from '../friend-request/entities/friend-request.entity';
import { UserToFriends } from './entities/user-to-friends.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Country, FriendRequest, UserToFriends]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
