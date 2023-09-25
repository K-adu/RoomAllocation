import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import * as moment from 'moment';
import { TimeService } from './handlers/time.service';
@Injectable()
export class BookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private timeService: TimeService,
  ) {}

  async createBookingService(body, req) {
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
      return 'The room is taken for the given time slot';
    }
  }

  async getAllBookingService() {
    return await this.bookingRepository.getAllBookingRepository();
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
}