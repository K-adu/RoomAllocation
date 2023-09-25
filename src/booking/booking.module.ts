import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from './schema/booking.schema';
import { SharedModule } from 'src/shared/shared.module';
import { BookingRepository } from './booking.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    SharedModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
})
export class BookingModule {}
