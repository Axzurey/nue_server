import { Body, Controller, Get, Header, Post, Query, Req, Res, Session } from "@nestjs/common";
import { lylacService } from "./lylac.service";
import { Request, response, Response } from "express";
import nenv from "src/shared/nenv";
import { getLylacAuthUrl } from "src/server/gapi";

@Controller('lylac')
export class lylacController {
    constructor(private readonly lylacService: lylacService) {}

    @Get('requestgauth')
    requestGoogleAuth(@Res() response: Response) {
        return response.status(200).send(getLylacAuthUrl());
    }

    @Get('gauth')
    handleGoogleAuth(@Query() params: Record<string, string>, @Res() response: Response, @Req() request: Request) {
        console.log(`req to gauth with code ${params.code}`)
        
        return response.setHeader('gtoken', params.code).redirect(200, './handover')
    }

    @Get('handover')
    handoverGoogleAuthToClient(@Req() request: Request) {
        console.log(request.headers['gtoken'])
        return response.status(200).send('redirecting back to app!')
    }
}