import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CalculationHistoryService } from './calculation-history.service';
import { AddHistoryDto } from './dtos/add-history.dto';
import { JwtAuthGuard } from '../../shared/auth/guards/jwt-auth.guard';
import { UserId } from '../../shared/auth/decorators/user-id.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../shared/dtos/paginated-response.dto';
import { CalculationHistoryDto } from './dtos/calculation-history.dto';

@ApiTags('Calculation History')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/calculation-history')
export class CalculationHistoryController {
  constructor(
    private readonly calculationHistoryService: CalculationHistoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new entry to the calculation history' })
  @ApiResponse({
    status: 201,
    description: 'The history entry has been successfully created.',
    type: CalculationHistoryDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async add(
    @Body() addHistoryDto: AddHistoryDto,
    @UserId() userId: string,
  ): Promise<CalculationHistoryDto> {
    return this.calculationHistoryService.add(addHistoryDto, userId);
  }

  @Get()
  @ApiOperation({ summary: "Get the current user's calculation history" })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiResponse({
    status: 200,
    description: 'A paginated list of calculation history entries.',
    type: PaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll(
    @UserId() userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ): Promise<PaginatedResponseDto<CalculationHistoryDto>> {
    limit = limit > 100 ? 100 : limit; // Cap limit to 100
    return this.calculationHistoryService.findAllByUserId(userId, {
      page,
      limit,
    });
  }
}