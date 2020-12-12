import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CastModule } from '@tunnel-cast/nestjs/cast.module'

@Module({
  imports: [
    CastModule.forFeature({})
  ],
  controllers: [CatsController],
  providers: [],
})
export class AppModule {}
