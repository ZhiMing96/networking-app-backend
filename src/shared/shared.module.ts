import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Country } from './entities/country.entities';
import { Expertise } from './entities/expertise.entity';
import { Industry } from './entities/industry.entity';
import { Occupation } from './entities/occupation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      Country,
      Expertise,
      Industry,
      Occupation,
    ]),
  ],
  controllers: [SharedController],
  providers: [SharedService],
})
export class SharedModule {}
