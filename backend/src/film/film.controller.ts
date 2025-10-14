import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';

@Controller('film')
export class FilmController {
    @Get()
    async streamVideo(@Req() req: Request, @Res() res: Response) {
        const id = "1U408Ot-4oGDRDm6Cvl__mUfzxOA9HK8B";
        const googleDriveUrl = `https://drive.google.com/uc?export=download&id=${id}`;
        const range = req.headers['range'] as string;
        try {
            const headResp = await axios.head(googleDriveUrl, { headers: { Range: 'bytes=0-0' } });
            const fileSize = parseInt(headResp.headers['content-length'], 10);

            if (range) {
                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': end - start + 1,
                    'Content-Type': 'video/mp4',
                    'Access-Control-Allow-Origin': '*',
                });

                const videoStream = await axios.get(googleDriveUrl, {
                    headers: { Range: `bytes=${start}-${end}` },
                    responseType: 'stream',
                });

                videoStream.data.pipe(res);
            } else {
                res.writeHead(200, {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                    'Access-Control-Allow-Origin': '*',
                });

                const videoStream = await axios.get(googleDriveUrl, { responseType: 'stream' });
                videoStream.data.pipe(res);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error streaming video');
        }
    }
}
