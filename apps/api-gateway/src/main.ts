import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(ApiGatewayModule);
  app.setGlobalPrefix('api');
  app.set('x-powered-by', false);
  //Versioning
  //CookieParser
  //GlobalPipes
  //CORS
  //HELMET

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
