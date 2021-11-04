import { Uuid } from 'src/utils/types';
import { RequestStatus } from '../entities/friend-request.entity';

export class CreateFriendRequestDto {
  fromUserId: Uuid;
  toUserId: Uuid;
  status?: RequestStatus;
  comment?: string;
}
