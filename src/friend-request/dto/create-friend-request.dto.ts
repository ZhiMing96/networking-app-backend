import { RequestStatus } from '../entities/friend-request.entity';

export class CreateFriendRequestDto {
  fromUserId: string;
  toUserId: string;
  status?: RequestStatus;
  comment?: string;
}
