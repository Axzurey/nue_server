import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authModule } from './routes/auth/auth.module';
import { lylacModule } from './routes/lylac/lylac.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/phxtest'), authModule, lylacModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
