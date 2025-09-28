import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
    constructor(private readonly spotifyService: SpotifyService) {}

    @Get('getToken')
    async getAccessToken() {
        return await this.spotifyService.getAccessToken();
    }

    @Get('playlist/:id')
    async getPlaylist(@Param('id') playlistId: string) {
        return this.spotifyService.getPlaylist(playlistId);
    }
}
