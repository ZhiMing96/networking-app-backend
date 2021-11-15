import { PartialType } from '@nestjs/mapped-types';
import { Country } from '../../shared/entities/country.entities';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  profileImageUrl?: string;
  shortDescription?: string;
  longDescription?: string;
  basedIn?: Country;
}
