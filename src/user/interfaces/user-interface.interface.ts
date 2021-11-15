import { Country } from '../../shared/entities/country.entities';

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  profileImageUrl?: string;
  shortDescription?: string;
  longDescription?: string;
  basedIn?: Country;
  passwordHash?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}
