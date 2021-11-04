import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UserToFriends } from './entities/user-to-friends.entity';
import { throwIfEmpty } from 'rxjs';
import { Uuid } from 'src/utils/types';

@Injectable()
export class UserService {
  constructor(
    private connection: Connection,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserToFriends)
    private userToFriendsRepository: Repository<UserToFriends>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: Uuid): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findOneWithFriends(id: Uuid): Promise<User[]> {
    const friendsAccepted = await this.connection
      .createQueryBuilder()
      .from(UserToFriends, 'utf')
      .innerJoin(User, 'user', 'user.id = utf.initiatorId')
      .where('utf.acceptorId = :userId', { userId: id })
      .getRawMany();

    const friendsInitiated = await this.connection
      .createQueryBuilder()
      .from(UserToFriends, 'utf')
      .innerJoin(User, 'user', 'user.id = utf.acceptorId')
      .where('utf.initiatorId = :userId', { userId: id })
      .getRawMany();

    return friendsAccepted.concat(friendsInitiated);
  }

  async createFriendRelationship(initiator_id: Uuid, acceptor_id: Uuid) {
    const initiator = await this.usersRepository.findOneOrFail({
      id: initiator_id,
    });

    const acceptor = await this.usersRepository.findOneOrFail({
      id: acceptor_id,
    });

    const friendship = this.userToFriendsRepository.create({
      initiator,
      acceptor,
    });

    return await this.userToFriendsRepository.save(friendship);
  }

  async update(id: Uuid, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async userExists(userId: Uuid): Promise<User> {
    return this.usersRepository.findOne({ id: userId });
  }
}
