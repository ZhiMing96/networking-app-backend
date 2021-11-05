import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Uuid } from 'src/utils/types';
import { Repository } from 'typeorm';
import { CreateIntroductionDto } from './dto/create-introduction.dto';
import { UpdateIntroductionDto } from './dto/update-introduction.dto';
import { Introduction } from './entities/introduction.entity';
import { introductionsForUser } from './interfaces/introductionsForUser.interface';

@Injectable()
export class IntroductionService {
  constructor(
    private userService: UserService,
    @InjectRepository(Introduction)
    private introductionRepository: Repository<Introduction>,
  ) {}

  async create(createIntroductionDto: CreateIntroductionDto) {
    return await this.introductionRepository.save(
      this.introductionRepository.create(createIntroductionDto),
    );
  }

  async findAllForUser(userId: Uuid): Promise<introductionsForUser> {
    const user = await this.userService.userExists(userId);
    if (!user) throw new NotFoundException('User not found');
    const allIntroductions = await this.introductionRepository
      .createQueryBuilder('intro')
      .leftJoinAndSelect('intro.post', 'p')
      .where('intro.introducedByUserId = :userId', { userId })
      .orWhere('intro.fromUserId = :userId', { userId })
      .orWhere('intro.toUserId = :userId', { userId })
      .getMany();

    const given = allIntroductions.filter(
      ({ introducedByUserId }) => introducedByUserId === userId,
    );
    const receivedAsTo = allIntroductions.filter(
      ({ toUserId }) => toUserId === userId,
    );
    const receivedAsFrom = allIntroductions.filter(
      ({ fromUserId }) => fromUserId === userId,
    );
    return { given, receivedAsFrom, receivedAsTo };
  }

  async findOne(id: Uuid): Promise<Introduction> {
    return await this.introductionRepository.findOneOrFail({ id });
  }

  async update(id: Uuid, updateIntroductionDto: UpdateIntroductionDto) {
    return await this.introductionRepository.update(id, updateIntroductionDto);
  }

  async remove(id: Uuid) {
    return await this.introductionRepository.delete(id);
  }
}
