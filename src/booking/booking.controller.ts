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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Event Booking')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({
    status: 201,
    description: 'object of the created booking',
  })
  @Post('/create')
  async createBookingController(
    @Body() body: CreateBookingDto,
    @Request() req,
  ) {
    try {
      return await this.bookingService.createBookingService(body, req);
    } catch (error) {
      return 'Error creating booking';
    }
  }

  @ApiOperation({ summary: 'Get all events (past and future)' })
  @UseGuards(AuthGuard)
  @Get('/display/all')
  async getAllBookingsController() {
    return await this.bookingService.getAllBookingService();
  }

  @ApiOperation({ summary: 'Get events that I booked' })
  @UseGuards(AuthGuard)
  @Get('/display/my')
  async getMyBookingController(@Request() req) {
    return await this.bookingService.getMyBookingService(req);
  }
}
