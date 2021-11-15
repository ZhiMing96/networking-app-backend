import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SharedService } from './shared.service';

@Controller('shared')
export class SharedController {
  constructor(private readonly sharedService: SharedService) {}
}
