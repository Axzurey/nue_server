import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  app.use(
    session({
      secret: 'phantomchickenashcakeroundbezierdropblue',
      resave: false,
      saveUninitialized: false,
      
    }),
  );

  await app.listen(7000);
}
bootstrap();
