import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(__dirname + '/../certs/key.pem'),
    cert: fs.readFileSync(__dirname + '/../certs/certificate.pem'),
  };

  const app = await NestFactory.create(AppModule /*{ httpsOptions }*/);
  // TODO: enable cors
  app.enableCors({ origin: '*' });
  await app.listen(3333);
}
bootstrap();
