import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from "src/server/mongo/userSchema";

@Injectable()
export class lylacService {
    constructor(@InjectModel(user.name) private userModel: Model<user>) {}

    getYoutubeVideoData() {
        
    }
}