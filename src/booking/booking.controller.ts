import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
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
  //euta api to display all the bookings order by time
  @UseGuards(AuthGuard)
  @Get('/display/all')
  async getAllBookingsController() {
    return await this.bookingService.getAllBookingService();
  }

  // arko api to display all the bookings that i booked
  @UseGuards(AuthGuard)
  @Get('/display/my')
  async getMyBookingController(@Request() req) {
    return await this.bookingService.getMyBookingService(req);
  }

  //arko api to edit the bookings that i booked

  //arko api to delete the bookings that i booked
  //show all the booked bookings
}
