import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entities/friend-request.entity';
import { UserToFriends } from 'src/user/entities/user-to-friends.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest, UserToFriends])],
  controllers: [FriendRequestController],
  providers: [FriendRequestService],
})
export class FriendRequestModule {}
