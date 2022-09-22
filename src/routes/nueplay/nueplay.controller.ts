import { Body, Controller, Get, Post, Req, Res, Session } from "@nestjs/common";
import { nueplayService } from "./nueplay.service";
import { Request, Response } from "express";
import nenv from "src/shared/nenv";

@Controller('nueplay')
export class nueplayController {
    constructor(private readonly nueplayService: nueplayService) {}

}