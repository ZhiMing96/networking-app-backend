import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToFriends } from 'src/user/entities/user-to-friends.entity';
import { User } from 'src/user/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { FriendRequest, RequestStatus } from './entities/friend-request.entity';

@Injectable()
export class FriendRequestService {
  constructor(
    private connection: Connection,
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(UserToFriends)
    private userToFriendsRepository: Repository<UserToFriends>,
  ) {}

  async create(
    createFriendRequestDto: CreateFriendRequestDto,
  ): Promise<FriendRequest> {
    const newRequest = this.friendRequestRepository.create(
      createFriendRequestDto,
    );
    return await this.friendRequestRepository.save(newRequest);
  }

  async findAllForUser(userId: string): Promise<FriendRequest[]> {
    const pendingResponse = await this.friendRequestRepository
      .createQueryBuilder('fr')
      .where('fr.fromUserId = :userId', { userId })
      .orWhere('fr.toUserId = :userId', { userId })
      .andWhere('fr.status = :status', { status: RequestStatus.PENDING })
      .getMany();

    return pendingResponse;
  }

  async rejectFriendRequest(
    fromUserId: string,
    toUserId: string,
  ): Promise<FriendRequest> {
    const friendRequest = await this.friendRequestRepository.findOne({
      fromUserId,
      toUserId,
    });
    if (!friendRequest) throw new NotFoundException();
    const queryRunner = this.connection.createQueryRunner();
    queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      friendRequest.status = RequestStatus.REJECTED;
      const updatedRequest = await queryRunner.manager.save(friendRequest);
      await queryRunner.manager.delete(UserToFriends, {
        initiatorId: fromUserId,
        acceptorId: toUserId,
      });
      await queryRunner.commitTransaction();
      return updatedRequest;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async acceptFriendRequest(
    fromUserId: string,
    toUserId: string,
  ): Promise<UserToFriends> {
    const friendRequest = await this.friendRequestRepository.findOne({
      fromUserId,
      toUserId,
    });
    if (!friendRequest) throw new NotFoundException();
    const queryRunner = this.connection.createQueryRunner();
    queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      friendRequest.status = RequestStatus.ACCEPTED;
      await queryRunner.manager.save(friendRequest);
      const friendship = this.userToFriendsRepository.create({
        acceptorId: toUserId,
        initiatorId: fromUserId,
      });
      await queryRunner.manager.save(friendship);
      await queryRunner.commitTransaction();
      return friendship;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
