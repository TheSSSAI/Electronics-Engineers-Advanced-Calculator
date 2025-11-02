import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserVariablesService } from './user-variables.service';
import { UpsertUserVariableDto } from './dtos/upsert-user-variable.dto';
import { JwtAuthGuard } from '../../shared/auth/guards/jwt-auth.guard';
import { UserId } from '../../shared/auth/decorators/user-id.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserVariableDto } from './dtos/user-variable.dto';

@ApiTags('User Variables')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user-variables')
export class UserVariablesController {
  constructor(private readonly userVariablesService: UserVariablesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create or update a user variable',
    description:
      "Implements a 'last-write-wins' strategy based on the clientUpdatedAt timestamp for offline synchronization.",
  })
  @ApiResponse({
    status: 200,
    description: 'The variable was successfully updated.',
    type: UserVariableDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The variable was successfully created.',
    type: UserVariableDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict. The server has a more recent version of the variable.',
  })
  async upsert(
    @Body() upsertUserVariableDto: UpsertUserVariableDto,
    @UserId() userId: string,
  ): Promise<UserVariableDto> {
    return this.userVariablesService.upsert(upsertUserVariableDto, userId);
  }

  @Get()
  @ApiOperation({ summary: "Get all of the current user's variables" })
  @ApiResponse({
    status: 200,
    description: 'A list of user variables.',
    type: [UserVariableDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll(@UserId() userId: string): Promise<UserVariableDto[]> {
    return this.userVariablesService.findAllByUserId(userId);
  }

  @Delete(':name')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user variable by name' })
  @ApiResponse({
    status: 204,
    description: 'The variable has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Variable not found.' })
  async remove(
    @Param('name') name: string,
    @UserId() userId: string,
  ): Promise<void> {
    return this.userVariablesService.remove(name, userId);
  }
}