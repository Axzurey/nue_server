import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authModule } from './routes/auth/auth.module';
import { NueplayModule } from './nueplay/nueplay.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/phxtest'), authModule, NueplayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
