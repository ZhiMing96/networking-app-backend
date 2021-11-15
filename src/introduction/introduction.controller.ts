import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { IntroductionService } from './introduction.service';
import { CreateIntroductionDto } from './dto/create-introduction.dto';
import { UpdateIntroductionDto } from './dto/update-introduction.dto';
import { Uuid } from 'src/utils/types';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
@Controller('introduction')
export class IntroductionController {
  constructor(private readonly introductionService: IntroductionService) {}

  @Post()
  create(@Body() createIntroductionDto: CreateIntroductionDto) {
    return this.introductionService.create(createIntroductionDto);
  }

  @Get(':userId')
  findAllForUser(@Param('userId') userId: Uuid) {
    return this.introductionService.findAllForUser(userId);
  }
  @Get('/suggestions/:postId')
  getSuggestionsForOtherUser(
    @Param('postId') postId: Uuid,
    @Req() req: Request,
  ) {
    const user = req.user as JwtPayload;
    return this.introductionService.getSuggestions(postId, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.introductionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Uuid,
    @Body() updateIntroductionDto: UpdateIntroductionDto,
  ) {
    return this.introductionService.update(id, updateIntroductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Uuid) {
    return this.introductionService.remove(id);
  }
}
