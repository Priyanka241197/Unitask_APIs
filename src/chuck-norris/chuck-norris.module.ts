import { Module } from '@nestjs/common';
import { ChuckNorrisService } from './chuck-norris.service';
import { ChuckNorrisController } from './chuck-norris.controller';

@Module({
  imports:[],
  controllers: [ChuckNorrisController],
  providers: [ChuckNorrisService],
})
export class ChuckNorrisModule {}
