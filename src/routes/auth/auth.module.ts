import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from 'src/server/mongo/userSchema';
import { authController } from './auth.controller';
import { authService } from './auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: user.name, schema: userSchema }])],
  controllers: [authController],
  providers: [authService],
})

export class authModule {}