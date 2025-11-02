import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../../shared/auth/guards/jwt-auth.guard';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthenticatedUser } from '../../shared/auth/types/authenticated-user.interface';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: "Get the current authenticated user's profile" })
  @ApiResponse({
    status: 200,
    description: 'The user profile.',
    type: UserDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getMyProfile(@Req() req: Request): Promise<UserDto> {
    const user = req.user as AuthenticatedUser;
    return this.usersService.findByAuthProviderId(user.sub);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete the current authenticated user's account and all data",
    description:
      'This is a permanent and irreversible action. It deletes all associated user data (custom modes, variables, history) from the database and removes the user from the identity provider.',
  })
  @ApiResponse({
    status: 204,
    description: 'The user account has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error during deletion process.' })
  async deleteMyAccount(@Req() req: Request): Promise<void> {
    const user = req.user as AuthenticatedUser;
    await this.usersService.deleteAccount(user.id, user.sub);
  }

  @Post('me/data-export')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: "Request an export of the current user's personal data",
    description:
      'Initiates an asynchronous process to collect all user data and send a download link via email. Compliant with GDPR/CCPA data access rights.',
  })
  @ApiResponse({
    status: 202,
    description: 'The data export request has been accepted and is being processed.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict. A data export is already in progress for this user.',
  })
  async requestDataExport(@Req() req: Request): Promise<{ message: string }> {
    const user = req.user as AuthenticatedUser;
    await this.usersService.requestDataExport(user.id);
    return {
      message: 'Your data export request has been received. You will receive an email with a download link when it is ready.',
    };
  }
}