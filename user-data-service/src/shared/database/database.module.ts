import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../modules/users/entities/user.entity';
import { CustomMode } from '../../modules/custom-modes/entities/custom-mode.entity';
import { UserVariable } from '../../modules/user-variables/entities/user-variable.entity';
import { CalculationHistory } from '../../modules/calculation-history/entities/calculation-history.entity';
import { UsersRepository } from '../../modules/users/repositories/users.repository';
import { CustomModesRepository } from '../../modules/custom-modes/repositories/custom-modes.repository';
import { UserVariablesRepository } from '../../modules/user-variables/repositories/user-variables.repository';
import { CalculationHistoryRepository } from '../../modules/calculation-history/repositories/calculation-history.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, CustomMode, UserVariable, CalculationHistory],
        // REQ-1-062: Migrations are handled by the CI/CD pipeline, not auto-sync.
        synchronize: false,
        logging: configService.get<string>('NODE_ENV') === 'development',
        // REQ-1-017: Assumes PostgreSQL
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false } // Adjust as per AWS RDS SSL requirements
            : false,
      }),
    }),
    TypeOrmModule.forFeature([User, CustomMode, UserVariable, CalculationHistory]),
  ],
  providers: [
    UsersRepository,
    CustomModesRepository,
    UserVariablesRepository,
    CalculationHistoryRepository,
  ],
  exports: [
    UsersRepository,
    CustomModesRepository,
    UserVariablesRepository,
    CalculationHistoryRepository,
  ],
})
export class DatabaseModule {}