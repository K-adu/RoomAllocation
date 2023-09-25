import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateBookingDto } from './dto/createBooking.dto';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  //create a manual booking
  constructor(private bookingService: BookingService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async createBookingController(
    @Body() body: CreateBookingDto,
    @Request() req,
  ) {
    // console.log(body);
    // console.log(req.user);
    try {
      return await this.bookingService.createBookingService(body, req);
    } catch (error) {
      console.log('this is error from the controlller', error);
    }
  }

  //show all the booked bookings
}
