import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { BookingResponse } from './dto/display.dto';
import { Booking } from './schema/booking.schema';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guard/auth.guard';

@Resolver((of) => Booking)
export class BookingResolver {
  constructor(private bookingService: BookingService) {}

  @Query(() => [BookingResponse])
  async getAllBookingResolver() {
    const bookings = await this.bookingService.getAllBookingService();
    console.log(bookings);
    return bookings;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Booking)
  async createBookingResolver(
    @Args('createBooking') body: CreateBookingDto,
    @Context() context: { req: Request },
  ) {
    const { req } = context;
    try {
      const user = req;
      console.log(req);
      return await this.bookingService.createBookingService(body, user);
    } catch (error) {
      return 'Error creating booking';
    }
  }
}
