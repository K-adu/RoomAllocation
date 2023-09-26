import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import {
  BookingFilters,
  BookingResponse,
  MyBookingsResponse,
} from './dto/display.dto';
import { Booking } from './schema/booking.schema';
import { CreateBookingDto } from './dto/createBooking.dto';
import { NotAcceptableException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guard/auth.guard';

@Resolver((of) => Booking)
export class BookingResolver {
  constructor(private bookingService: BookingService) {}

  // getting all the bookings of all the users
  // @UseGuards(AuthGuard)
  @Query(() => [BookingResponse])
  async getAllBooking(@Args('filters') filter: BookingFilters) {
    console.log(filter);
    const bookings = await this.bookingService.getAllBookingService(filter);
    console.log(bookings);
    return bookings;
  }
  // getting the bookings that i posted
  @UseGuards(AuthGuard)
  @Query(() => [MyBookingsResponse])
  async getMyBooking(@Context() context: { req: Request }) {
    const { req } = context;
    const bookings = await this.bookingService.getMyBookingService(req);
    return bookings;
  }

  //getting

  //creating new bookings
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
