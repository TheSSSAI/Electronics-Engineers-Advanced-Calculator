import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, PinoLogger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true }, // Buffer logs until Pino is ready
  );

  // Use PinoLogger as the main application logger
  const pinoLogger = app.get(PinoLogger);
  app.useLogger(pinoLogger);

  // Use the global logger for bootstrap messages
  const logger = app.get(Logger);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // Set a global prefix for all routes for versioning
  app.setGlobalPrefix('api/v1');

  // Enable CORS
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', '*'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Apply a global filter to catch and format HTTP exceptions
  app.useGlobalFilters(new HttpExceptionFilter());

  // Apply a global pipe for request validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted values are provided
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configure OpenAPI (Swagger) documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Calculator User & Data Service API')
    .setDescription(
      'API for managing user data, custom modes, variables, and calculation history.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt', // This name must match the name in the @ApiBearerAuth() decorator
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  logger.log('OpenAPI documentation available at /api-docs');

  await app.listen(port, '0.0.0.0');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((error) => {
  // Use a console.error for bootstrap failures as the pino logger might not be initialized
  console.error(`Fatal error during application bootstrap: ${error.message}`, error.stack);
  process.exit(1);
});