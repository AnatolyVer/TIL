import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as mammoth from 'mammoth';

@Injectable()
export class DocxService {
    async convertDocxUrlToHtml(docxUrl: string): Promise<string> {
        try {
            const response = await axios.get(docxUrl, {
                responseType: 'arraybuffer',
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                },
                maxRedirects: 5,
            });

            const buffer = Buffer.from(response.data);
            const result = await mammoth.convertToHtml({ buffer });

            return result.value;
        } catch (error) {
            console.error(error);
            throw new Error(`Failed to fetch or convert DOCX file: ${error}`);
        }
    }
}
