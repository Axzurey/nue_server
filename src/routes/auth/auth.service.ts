import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from "src/server/mongo/userSchema";
import { AuthError, loginOptions, userSignupInterface } from "src/server/validation";
import * as crypto from 'crypto';

@Injectable()
export class authService {
    //key: sessionToken, value: user
    sessionTokens: Map<string, string> = new Map();

    //key: user, value: sessionToken array

    inverseSessionTokens: Map<string, string[]> = new Map()

    constructor(@InjectModel(user.name) private userModel: Model<user>) {}

    generateUserSessionToken(id: string) {
        let token = crypto.randomBytes(32).toString('hex');

        this.sessionTokens[token] = id;

        if (this.inverseSessionTokens.has(id)) {
            let g = this.inverseSessionTokens.get(id)
            this.inverseSessionTokens.set(id, [...g, token])
        }
        else {
            this.inverseSessionTokens.set(id, [token]);
        }

        return token;
    }

    async registerUser(registrationCredentials: userSignupInterface): Promise<[boolean, string, string]> {
        if (await this.userModel.findOne({email: registrationCredentials.email})) return [false, AuthError.EMAIL_TAKEN, 'email']
        if (await this.userModel.findOne({username: registrationCredentials.username})) return [false, AuthError.USERNAME_TAKEN, 'username']

        let usr = new this.userModel();
        
        usr.email = registrationCredentials.email;
        usr.username = registrationCredentials.username;
        usr.password = registrationCredentials.password;

        await usr.save();
        return [true, 'OK', 'OK'];
    }

    async signInUser(loginCredentials: loginOptions) {
        let usr: user;

        if ('email' in loginCredentials) {
            usr = await this.userModel.findOne({email: loginCredentials.email});
        }
        else {
            usr = await this.userModel.findOne({username: loginCredentials.username});
        }

        if (!usr) return [false, AuthError.NO_SUCH_USER, 'NOT OK'];
    
        let token = this.generateUserSessionToken(usr._id)
        
        return [true, token, 'OK']
    }
}