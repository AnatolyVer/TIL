import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpotifyService {
    private clientId = process.env.SPOTIFY_CLIENT_ID;
    private clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    private token: string | null = null;
    private refreshToken: string = process.env.REFRESH_TOKEN as string;

    async getAccessToken() {
        const authBuffer = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: this.refreshToken,
                }).toString(),
                {
                    headers: {
                        Authorization: `Basic ${authBuffer}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            );

            this.token = response.data.access_token;
            return this.token;
        } catch (error) {
            throw new Error('Ошибка обновления токена Spotify');
        }
    }

    async getPlaylist(playlistId: string): Promise<any> {
        await this.getAccessToken();
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/playlists/${playlistId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                },
            );

            return response.data;
        } catch (error) {
            console.log(error)
            throw new HttpException(
                'Failed to fetch playlist',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
