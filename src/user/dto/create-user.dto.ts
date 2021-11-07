import { Country } from '../entities/country.entities';

export class CreateUserDto {
  username: string;
  password: string;
  emailAddress: string;
}
