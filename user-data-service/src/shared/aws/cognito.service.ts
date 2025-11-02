import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoIdentityProviderClient,
  AdminDeleteUserCommand,
  UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import { SdkServiceException } from '@aws-sdk/types';

/**
 * A service to encapsulate interactions with AWS Cognito.
 * This acts as a wrapper around the AWS SDK for Cognito, providing
 * specific, application-relevant methods.
 * @see REQ-1-029
 */
@Injectable()
export class CognitoService {
  private readonly logger = new Logger(CognitoService.name);
  private readonly cognitoClient: CognitoIdentityProviderClient;
  private readonly userPoolId: string;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    if (!region) {
      throw new InternalServerErrorException('AWS_REGION is not configured.');
    }

    this.cognitoClient = new CognitoIdentityProviderClient({ region });

    this.userPoolId = this.configService.get<string>('AWS_COGNITO_USER_POOL_ID');
    if (!this.userPoolId) {
      throw new InternalServerErrorException(
        'AWS_COGNITO_USER_POOL_ID is not configured.',
      );
    }
  }

  /**
   * Permanently deletes a user from the AWS Cognito User Pool.
   * This is a critical step in the account deletion process.
   * @param {string} authProviderId - The user's unique identifier in Cognito (usually the 'sub' claim from the JWT).
   * @returns {Promise<void>}
   * @throws {NotFoundException} If the user does not exist in Cognito.
   * @throws {InternalServerErrorException} For other AWS SDK or configuration errors.
   * @see REQ-1-031
   * @see US-058
   */
  async deleteUser(authProviderId: string): Promise<void> {
    this.logger.log(`Attempting to delete user from Cognito: ${authProviderId}`);

    const command = new AdminDeleteUserCommand({
      UserPoolId: this.userPoolId,
      Username: authProviderId,
    });

    try {
      await this.cognitoClient.send(command);
      this.logger.log(`Successfully deleted user from Cognito: ${authProviderId}`);
    } catch (error) {
      this.handleCognitoError(error, authProviderId);
    }
  }

  private handleCognitoError(error: unknown, authProviderId: string): never {
    if (error instanceof UserNotFoundException) {
      // This is not necessarily a failure state in a deletion flow, as the user might
      // have been deleted in a previous attempt. We log it but throw a specific exception.
      this.logger.warn(
        `User with authProviderId '${authProviderId}' not found in Cognito. They may have already been deleted.`,
      );
      throw new NotFoundException(`User not found in Cognito.`);
    }

    const sdkError = error as SdkServiceException;
    this.logger.error(
      `Failed to delete user from Cognito. AuthProviderId: ${authProviderId}. Error: ${sdkError.name} - ${sdkError.message}`,
      sdkError.stack,
    );

    throw new InternalServerErrorException(
      'An error occurred while communicating with the identity provider.',
    );
  }
}