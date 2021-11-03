import { Country } from '../entities/country.entities';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  shortDescription?: string;
  longDescription?: string;
  basedIn?: Country;
  emailAddress: string;
}
