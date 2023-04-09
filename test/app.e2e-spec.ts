import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum'
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import { GenerateCities } from "./utils"

const APP_VER = require("../package.json").version;

const GATEWAY_URL = "http://localhost:3333";

describe('Get-fit-go API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduelRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();


    app = moduelRef.createNestApplication();
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService)
    GenerateCities(prisma)
    pactum.request.setBaseUrl(GATEWAY_URL);
  }); 

  afterAll(async () => {
    await app.close();
  })

  describe('Uauthorized user', () => {
    describe('Auth', () => {

    })

    describe('Forbidden resources', () => {

    })

    describe('Ping', () => {
      it('Should return current version', () => {
        pactum.spec().get('/version').expectBodyContains(APP_VER).expectStatus(200)
      })
    })
  });
});