import { Body, Controller, Get, Header, Post, Query, Req, Res, Session } from "@nestjs/common";
import { lylacService } from "./lylac.service";
import { authService } from "../auth/auth.service";
import { Request, Response } from "express";
import nenv from "src/shared/nenv";

@Controller('lylac')
export class lylacController {
    constructor(private readonly lylacService: lylacService, private readonly authService: authService) {}

    @Post('playlist/create')
    createPlaylist(@Session() session: Record<string, any>, @Res() response: Response) {
        if (!session.nueToken) return response.status(401).send({
            msg: 'Invalid session, please re-authenticate'
        })


    }
    addTrackToPlaylist(@Session() session: Record<string, any>) {
        
    }
}