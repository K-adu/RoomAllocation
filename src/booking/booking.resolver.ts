import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { BookingResponse, MyBookingsResponse } from './dto/display.dto';
import { Booking } from './schema/booking.schema';
import { CreateBookingDto } from './dto/createBooking.dto';
import { NotAcceptableException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guard/auth.guard';

@Resolver((of) => Booking)
export class BookingResolver {
  constructor(private bookingService: BookingService) {}

  @UseGuards(AuthGuard)
  @Query(() => [BookingResponse])
  async getAllBooking() {
    const bookings = await this.bookingService.getAllBookingService();
    console.log(bookings);
    return bookings;
  }

  @UseGuards(AuthGuard)
  @Query(() => [MyBookingsResponse])
  async getMyBooking(@Context() context: { req: Request }) {
    const { req } = context;
    const bookings = await this.bookingService.getMyBookingService(req);
    return bookings;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Booking)
  async createBooking(
    @Args('createBooking') body: CreateBookingDto,
    @Context() context: { req: Request },
  ) {
    const { req } = context;
    try {
      const user = req;
      return await this.bookingService.createBookingService(body, user);
    } catch (error) {
      throw new NotAcceptableException(
        'Sorry the Event cannot be created for the time slot',
      );
    }
  }
}
