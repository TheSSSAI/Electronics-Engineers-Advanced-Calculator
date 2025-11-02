import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { CustomModesService } from './custom-modes.service';
import { CreateCustomModeDto } from './dtos/create-custom-mode.dto';
import { UpdateCustomModeDto } from './dtos/update-custom-mode.dto';
import { JwtAuthGuard } from '../../shared/auth/guards/jwt-auth.guard';
import { UserId } from '../../shared/auth/decorators/user-id.decorator';
import { CustomModeDto } from './dtos/custom-mode.dto';
import { PaginatedResponseDto } from '../../shared/dtos/paginated-response.dto';

@ApiTags('Custom Modes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/custom-modes')
export class CustomModesController {
  constructor(private readonly customModesService: CustomModesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new custom mode' })
  @ApiResponse({
    status: 201,
    description: 'The custom mode has been successfully created.',
    type: CustomModeDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict. A custom mode with this name already exists.',
  })
  async create(
    @Body() createCustomModeDto: CreateCustomModeDto,
    @UserId() userId: string,
  ): Promise<CustomModeDto> {
    return this.customModesService.create(createCustomModeDto, userId);
  }

  @Get()
  @ApiOperation({ summary: "Get all of the current user's custom modes" })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiResponse({
    status: 200,
    description: 'A paginated list of custom modes.',
    type: PaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll(
    @UserId() userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedResponseDto<CustomModeDto>> {
    limit = limit > 100 ? 100 : limit; // Cap limit to 100
    return this.customModesService.findAllByUserId(userId, { page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific custom mode by ID' })
  @ApiResponse({
    status: 200,
    description: 'The requested custom mode.',
    type: CustomModeDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Custom mode not found.' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @UserId() userId: string,
  ): Promise<CustomModeDto> {
    return this.customModesService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a custom mode' })
  @ApiResponse({
    status: 200,
    description: 'The custom mode has been successfully updated.',
    type: CustomModeDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Custom mode not found.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict. A custom mode with this name already exists.',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomModeDto: UpdateCustomModeDto,
    @UserId() userId: string,
  ): Promise<CustomModeDto> {
    return this.customModesService.update(id, updateCustomModeDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a custom mode' })
  @ApiResponse({
    status: 204,
    description: 'The custom mode has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Custom mode not found.' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @UserId() userId: string,
  ): Promise<void> {
    return this.customModesService.remove(id, userId);
  }
}