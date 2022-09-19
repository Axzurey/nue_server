import mongoose, { Document, Mongoose } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as crypto from 'crypto'
import 'dotenv/config'
import benchmark from "src/shared/benchmark";

@Schema()
export class user extends Document {
    @Prop({required: true})
    username: string

    @Prop({required: true, set: function(password: string) {

        password = password.normalize()

        let resT = benchmark.Timer.start()

        let salt = crypto.randomBytes(32).toString('hex');
        
        let hash = crypto.pbkdf2Sync(password, salt, 103300, 64, 'sha512').toString('hex');

        console.log(resT.timeNow(true))

        this.password = `${salt}:${hash}`;
    }})
    password: string

    @Prop({required: true})
    email: string

    @Prop({required: true})
    currentSessions: string[]
}

export const userSchema = SchemaFactory.createForClass(user);

export function validatePassword(check: string, passwordHash: string): boolean {
    check = check.normalize()
    
    let [salt, hash] = passwordHash.split(':');
    let h = crypto.pbkdf2Sync(check, salt, 103300, 64, 'sha512').toString('hex');

    return h === hash;
}