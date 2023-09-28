import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import {
  BookingFilters,
  BookingResponse,
  MyBookingsResponse,
  OngoingMeetings,
} from './dto/display.dto';
import { Booking } from './schema/booking.schema';
import { CreateBookingDto } from './dto/createBooking.dto';
import { NotAcceptableException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { EditBookingDto, EditBookingResponse } from './dto/editBooking.dto';
import { DeleteBookingDto } from './dto/delete.dto';

@Resolver((of) => Booking)
export class BookingResolver {
  constructor(private bookingService: BookingService) {}

  // getting all the bookings of all the users
  // @UseGuards(AuthGuard)
  @Query(() => [BookingResponse])
  async allBookings(@Args('filters') filter: BookingFilters) {
    const bookings = await this.bookingService.getAllBookingService(filter);
    return bookings;
  }
  // getting the bookings that i posted
  @UseGuards(AuthGuard)
  @Query(() => [MyBookingsResponse])
  async myBookings(@Context() context: { req: Request }) {
    const { req } = context;
    const bookings = await this.bookingService.getMyBookingService(req);
    return bookings;
  }

  //API that return meeting that is ongoing now
  @UseGuards(AuthGuard)
  @Query(() => [OngoingMeetings])
  async onGoingMeetings() {
    const bookings = await this.bookingService.getAllOngoingMeetings();
    return bookings;
  }

  //creating new bookings
  @UseGuards(AuthGuard)
  @Mutation(() => Booking)
  async createManualBooking(
    @Args('create') body: CreateBookingDto,
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

  //edit event
  @UseGuards(AuthGuard)
  @Mutation(() => EditBookingResponse)
  async editBooking(
    @Args('editBooking') data: EditBookingDto,
    @Context() context: { req: Request },
  ) {
    const { req } = context;
    const bookingId = data._id;
    return await this.bookingService.editBookingService(req, data, bookingId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteBooking(@Args('deleteBooking') data: DeleteBookingDto) {
    try {
      await this.bookingService.deleteBookingService(data._id);
    } catch (error) {
      throw new NotAcceptableException('cannot delete the user');
    }
    return true;
  }
}
