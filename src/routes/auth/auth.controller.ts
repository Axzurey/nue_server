import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { authService } from "./auth.service";
import { Request, Response } from "express";
import { userSignupInterface, userSignupSchema } from "src/server/validation";

@Controller('auth')
export class authController {
    constructor(private readonly authService: authService) {}

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
    async login(@Req() request: Request) {
        
    }
}