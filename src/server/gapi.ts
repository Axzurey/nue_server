import {google} from 'googleapis';
import 'dotenv/config'

const lylacAuthClient = new google.auth.OAuth2(process.env.LYLAC_ID, process.env.LYLAC_SECRET, process.env.LYLAC_REDIRECT);

const lylacScopes: string[] = ['https://www.googleapis.com/auth/youtube.readonly']

export function getLylacAuthUrl() {
    return lylacAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: lylacScopes
    })
}