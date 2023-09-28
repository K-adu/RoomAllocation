import { Injectable, NotAcceptableException } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import * as moment from 'moment';
import { TimeService } from './handlers/time.service';
import { ThreeSixty } from '@mui/icons-material';
import { identity } from 'rxjs';
@Injectable()
export class BookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private timeService: TimeService,
  ) {}

  async createBookingService(body, req) {
    const providedDate = new Date(body.date);

    const currentDate = new Date();

    if (providedDate < currentDate) {
      throw new NotAcceptableException('The date cannot be in the past.');
    }

    const startTime = moment(body.startTime, 'h:mm A').toISOString();
    const endTime = moment(body.endTime, 'h:mm A').toISOString();
    const hostName = req.user.id;
    const data = {
      ...body,
      hostName,
      startTime,
      endTime,
    };

    const vacantRoom = await this.checkVacantRoomService(data);
    if (vacantRoom) {
      return await this.bookingRepository.createBookingRepository(data);
    } else {
      throw new NotAcceptableException('Cannot Create For the Given Time Slot');
    }
  }

  async getAllBookingService(filter) {
    return await this.bookingRepository.getAllBookingRepository(filter);
  }

  async getMyBookingService(req) {
    const userId = req.user.id;
    return await this.bookingRepository.getMyBookingRepository(userId);
  }

  async checkVacantRoomService(data) {
    if (data.startTime === data.endTime) {
      return 'startTime cannot be equal to end time';
    }
    return await this.timeService.timeHandlerAMPM(data);
  }

  async getAllOngoingMeetings() {
    return await this.bookingRepository.getAllOngoingMeetingsRepository();
  }

  async editBookingService(req, data, bookingId) {
    // Check if the user is allowed to edit this booking
    const userId = req.user.id;
    let isPost = await this.bookingRepository.checkLoggedInUserBooking(
      bookingId,
      userId,
    );
    if (!isPost) {
      throw new NotAcceptableException('You cannot edit the post');
    }

    // Extract the start and end times from the request data
    const startTime = moment(data.startTime, 'h:mm A').toISOString();
    const endTime = moment(data.endTime, 'h:mm A').toISOString();

    // Check if the edited slot overlaps with other meetings
    const vacantRoom = await this.checkVacantRoomService(data);
    if (vacantRoom) {
      return await this.bookingRepository.editBookingRepository(
        bookingId,
        data,
      );
    } else {
      throw new NotAcceptableException('Cannot Create For the Given Time Slot');
    }
  }
  async deleteBookingService(id) {
    try {
      return this.bookingRepository.deleteBookingRepository(id);
    } catch (e) {
      throw new NotAcceptableException('the booking cannot be deleted');
    }
  }
}
