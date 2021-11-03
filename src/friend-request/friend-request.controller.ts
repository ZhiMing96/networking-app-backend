import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';

@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @Post()
  create(@Body() createFriendRequestDto: CreateFriendRequestDto) {
    return this.friendRequestService.create(createFriendRequestDto);
  }

  @Patch('/accept')
  acceptFriendRequest(
    @Body('toUserId') toUserId: string,
    @Body('fromUserId') fromUserId: string,
  ) {
    return this.friendRequestService.acceptFriendRequest(fromUserId, toUserId);
  }
  @Patch('/reject')
  rejectFriendRequest(
    @Body('toUserId') toUserId: string,
    @Body('fromUserId') fromUserId: string,
  ) {
    return this.friendRequestService.rejectFriendRequest(fromUserId, toUserId);
  }

  @Get(':userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.friendRequestService.findAllForUser(userId);
  }
}
