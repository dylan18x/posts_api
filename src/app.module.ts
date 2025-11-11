import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicsService } from './basics/basics.service';
import { BasicsController } from './basics/basics.controller';
import { BasicsModule } from './basics/basics.module';

@Module({
  imports: [BasicsModule],
  controllers: [AppController, BasicsController],
  providers: [AppService, BasicsService],
})
export class AppModule {}
