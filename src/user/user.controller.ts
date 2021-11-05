import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { Uuid } from 'src/utils/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Req() req): Promise<User[]> {
    console.log(req.user);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Uuid): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('/friends')
  createFriendship(
    @Body('initiatorId') initiatorId: string,
    @Body('acceptorId') acceptorId: string,
  ) {
    return this.userService.createFriendRelationship(initiatorId, acceptorId);
  }

  @Get('/friends/:id')
  findOneWithFriends(@Param('id') id: Uuid): Promise<User[]> {
    return this.userService.findOneWithFriends(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Uuid,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.update(id, updateUserDto);
  }
}
