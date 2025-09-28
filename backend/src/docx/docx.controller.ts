import { Controller, Get, Query } from '@nestjs/common';
import { DocxService } from './docx.service';

@Controller('docx')
export class DocxController {
  constructor(private readonly docxService: DocxService) {}

  @Get()
  async getHtml(@Query('id') id: string): Promise<string> {
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${id}`;
    return this.docxService.convertDocxUrlToHtml(downloadUrl);
  }
}