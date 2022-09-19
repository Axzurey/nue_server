import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { authService } from "./auth.service";
import { Request, Response } from "express";
import { userSignupInterface, userSignupSchema } from "src/server/validation";

@Controller('auth')
export class authController {
    constructor(private readonly authService: authService) {}

    @Post('register')
    async register(@Res() response: Response, @Body() information: userSignupInterface) {
        let isInfoValid = userSignupSchema.isValidSync(information);
        
        if (isInfoValid) {
            this.authService.registerUser(information);
        }
        else {
            response.status(401).send()
        }
    }

    @Get('login')
    async login(@Req() request: Request) {
        
    }
}