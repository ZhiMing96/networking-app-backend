import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { Uuid } from 'src/utils/types';

@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @Post()
  create(@Body() createFriendRequestDto: CreateFriendRequestDto) {
    return this.friendRequestService.create(createFriendRequestDto);
  }

  @Patch('/accept')
  acceptFriendRequest(
    @Body('toUserId') toUserId: Uuid,
    @Body('fromUserId') fromUserId: Uuid,
  ) {
    return this.friendRequestService.acceptFriendRequest(fromUserId, toUserId);
  }
  @Patch('/reject')
  rejectFriendRequest(
    @Body('toUserId') toUserId: Uuid,
    @Body('fromUserId') fromUserId: Uuid,
  ) {
    return this.friendRequestService.rejectFriendRequest(fromUserId, toUserId);
  }

  @Get(':userId')
  findAllForUser(@Param('userId') userId: Uuid) {
    return this.friendRequestService.findAllForUser(userId);
  }
}
