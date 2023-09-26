import { Query, Resolver } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { BookingResponse } from './dto/display.dto';
import { Booking } from './schema/booking.schema';

@Resolver((of) => Booking)
export class BookingResolver {
  constructor(private bookingService: BookingService) {}

  @Query(() => [BookingResponse])
  async getAllBookingResolver() {
    const bookings = await this.bookingService.getAllBookingService();
    console.log(bookings);
    return bookings;
  }
}
