import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CastModule } from 'nestjs-tunnel-cast/dist/cast.module'

@Module({
  imports: [
    CastModule.forFeature({})
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
