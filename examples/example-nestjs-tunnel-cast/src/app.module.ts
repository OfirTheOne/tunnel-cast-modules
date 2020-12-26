import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { BirdsController } from './birds/birds.controller';
import { CastModule } from '@tunnel-cast/nestjs/cast.module'

@Module({
  imports: [
    CastModule.forFeature({})
  ],
  controllers: [CatsController, BirdsController],
  providers: [],
})
export class AppModule {}
