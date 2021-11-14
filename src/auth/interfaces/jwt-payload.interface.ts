import { Uuid } from 'src/utils/types';

export interface JwtPayload {
  username: string;
  id: Uuid;
  emailAddress: string;
}
