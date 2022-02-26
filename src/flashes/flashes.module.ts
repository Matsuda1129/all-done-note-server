import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flash } from '../database/entities/flashes.entity';
import { FlashesService } from './flashes.service';
import { FlashesController } from './flashes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flash]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [FlashesController],
  providers: [FlashesService],
  exports: [FlashesService],
})
export class FlashesModule {}
