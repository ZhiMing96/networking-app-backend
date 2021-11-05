import { Introduction } from '../entities/introduction.entity';

export interface introductionsForUser {
  given: Introduction[];
  receivedAsFrom: Introduction[];
  receivedAsTo: Introduction[];
}
