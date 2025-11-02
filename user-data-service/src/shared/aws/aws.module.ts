import { Global, Module } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { SqsService } from './sqs.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [CognitoService, SqsService],
  exports: [CognitoService, SqsService],
})
export class AwsModule {}