import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from 'src/server/mongo/userSchema';
import { lylacController } from './lylac.controller';
import { lylacService } from './lylac.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: user.name, schema: userSchema }])],
  controllers: [lylacController],
  providers: [lylacService],
})

export class lylacModule {}
