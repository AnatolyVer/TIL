import {Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import { FairyTaleService } from './fairyTale.service';
import { Response } from 'express';
import axios from 'axios';

@Controller('fairy_tales')
export class FairyTaleController {
    constructor(private readonly fairyTaleService: FairyTaleService) {}

    @Get()
    async getAll() {
        return this.fairyTaleService.findAll();
    }

    @Post('add')
    async add() {
        return this.fairyTaleService.add();
    }

    @Get(':id')
    async getByID(@Param('id') id: string) {
        return this.fairyTaleService.findById(id);
    }

    @Get(':id/audio')
    async getAudio(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const tale = await this.fairyTaleService.findById(id);
        if (!tale) {
            return res.status(404).send('No tale');
        }

        const range = req.headers['range'] as string;
        const CHUNK_SIZE = 10 ** 6;

        try {
            const response = await axios.get(tale.link, {
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
