import { Module } from '@nestjs/common';
import { DocxController } from './docx/docx.controller';
import { ConfigModule} from '@nestjs/config';
import { DocxService } from './docx/docx.service';
import {SpotifyController} from "./spotify/spotify.controller";
import {SpotifyService} from "./spotify/spotify.service";
import * as process from "process";
import {MongooseModule} from "@nestjs/mongoose";
import {FairyTaleModule} from "./fairyTale/fairyTale.module";
import {FilmController} from "./film/film.controller";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: [
              process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
              '.env',
          ],
          isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.MONGODB_URL as string),
      FairyTaleModule
  ],
  controllers: [DocxController, SpotifyController, FilmController],
  providers: [DocxService, SpotifyService],
})
export class AppModule {}
