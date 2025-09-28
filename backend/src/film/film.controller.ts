import { Controller, Get, Req, Res, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';

@Controller('film')
export class FilmController {
    @Get()
    async streamVideo(
        @Req() req: Request,
        @Res() res: Response,
    ) {

        const id = "1qhVo44dVMkP1OMMMS6dRH-YgEFuuRdiT"
        const googleDriveUrl = `https://drive.google.com/uc?export=download&id=${id}`;
        const range = req.headers['range'] as string;
        const CHUNK_SIZE = 10 ** 6;

        try {
            const response = await axios.get(googleDriveUrl, {
                responseType: 'arraybuffer',
            });

            const fileBuffer = Buffer.from(response.data);
            const fileSize = fileBuffer.length;

            if (range) {
                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunkSize = end - start + 1;

                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'audio/mpeg',
                    'Access-Control-Allow-Origin': '*',
                });

                res.end(fileBuffer.slice(start, end + 1));
            } else {
                res.writeHead(200, {
                    'Content-Length': fileSize,
                    'Content-Type': 'audio/mpeg',
                    'Access-Control-Allow-Origin': '*',
                });
                res.end(fileBuffer);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching audio');
        }
    }
}
