import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from "src/server/mongo/userSchema";
import { userSignupInterface } from "src/server/validation";

@Injectable()
export class authService {
    constructor(@InjectModel(user.name) private userModel: Model<user>) {}

    async registerUser(registrationCredentials: userSignupInterface) {
        if (this.userModel.findOne({email: registrationCredentials.email})) return x
        
    }
}