import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from './schema/booking.schema';
import { BookingRepository } from './booking.repository';
import { TimeService } from './handlers/time.service';
import { BookingResolver } from './booking.resolver';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    SharedModule,
  ],
  providers: [BookingService, BookingRepository, TimeService, BookingResolver],
})
export class BookingModule {}
