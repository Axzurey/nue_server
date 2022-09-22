import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from 'src/server/mongo/userSchema';
import { nueplayController } from './nueplay.controller';
import { nueplayService } from './nueplay.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: user.name, schema: userSchema }])],
  controllers: [nueplayController],
  providers: [nueplayService],
})

export class NueplayModule {}
