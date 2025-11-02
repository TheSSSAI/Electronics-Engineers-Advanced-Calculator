import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQSClient, SendMessageCommand, SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import { SdkServiceException } from '@aws-sdk/types';

/**
 * A service to encapsulate interactions with AWS SQS.
 * This provides a simple interface for sending messages to SQS queues,
 * abstracting away the details of the AWS SDK.
 */
@Injectable()
export class SqsService {
  private readonly logger = new Logger(SqsService.name);
  private readonly sqsClient: SQSClient;
  private readonly defaultQueueUrl: string | undefined;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    if (!region) {
      throw new InternalServerErrorException('AWS_REGION is not configured.');
    }
    this.sqsClient = new SQSClient({ region });
    // This allows for a default queue to be configured, e.g., for data exports
    this.defaultQueueUrl = this.configService.get<string>('AWS_SQS_DEFAULT_QUEUE_URL');
  }

  /**
   * Sends a message to an SQS queue.
   * @param {object} messageBody - The message payload, which will be JSON stringified.
   * @param {string} [queueUrl] - The URL of the target SQS queue. If not provided, the default queue URL from config will be used.
   * @returns {Promise<SendMessageCommandOutput>} The output from the AWS SDK, including the MessageId.
   * @throws {InternalServerErrorException} If the queue URL is not specified and no default is configured, or if the SDK call fails.
   * @see US-071
   */
  async sendMessage(
    messageBody: object,
    queueUrl?: string,
  ): Promise<SendMessageCommandOutput> {
    const targetQueueUrl = queueUrl || this.defaultQueueUrl;

    if (!targetQueueUrl) {
      this.logger.error('SQS queue URL is not defined. Cannot send message.');
      throw new InternalServerErrorException('Message queue is not configured.');
    }

    const command = new SendMessageCommand({
      QueueUrl: targetQueueUrl,
      MessageBody: JSON.stringify(messageBody),
    });

    try {
      const result = await this.sqsClient.send(command);
      this.logger.log(`Message sent to SQS queue. MessageId: ${result.MessageId}`);
      return result;
    } catch (error) {
      const sdkError = error as SdkServiceException;
      this.logger.error(
        `Failed to send message to SQS. Queue: ${targetQueueUrl}. Error: ${sdkError.name} - ${sdkError.message}`,
        sdkError.stack,
      );
      throw new InternalServerErrorException('Failed to queue message.');
    }
  }
}