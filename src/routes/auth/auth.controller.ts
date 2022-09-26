import { Body, Controller, Get, Post, Req, Res, Session } from "@nestjs/common";
import { authService } from "./auth.service";
import { Request, Response } from "express";
import { loginOptions, userSignupInterface, userSignupSchema } from "src/server/validation";
import nenv from "src/shared/nenv";

@Controller('auth')
export class authController {
    constructor(private readonly authService: authService) {}

    @Post('test')
    test() {
        console.log('lets go')
        nenv.log(new TypeError('hello'))
    }

    @Post('register')
    async register(@Res() response: Response, @Body() information: userSignupInterface) {
        await userSignupSchema.validate(information).then(async () => {
            let [res, msg, pointOfError] = await this.authService.registerUser(information);

            if (res) {
                return response.status(200).send('OK')
            }
            else {
                return response.status(400).send({
                    pointOfError: pointOfError,
                    msg: msg,
                })
            }
        }).catch((e) => {
            if (e.name === "ValidationError") {
                return response.status(400).send({
                    pointOfError: e.path,
                    msg: e.errors[0]
                })
            }
        })
    }

    @Post('login')
    async login(@Session() session: Record<string, any>, @Req() request: Request, @Body() information: loginOptions) {
        let [res, msg, pointOfError] = await this.authService.signInUser(information);

        if (res) {
            session['session'] = msg;
        }
    }
}