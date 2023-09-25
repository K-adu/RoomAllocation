import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';

@Injectable()
export class BookingService {
  constructor(private bookingRepository: BookingRepository) {}
  async createBookingService(body, req) {
    const hostName = req.user.id;
    const data = {
      ...body,
      hostName,
    };
    const vacantRoom = await this.bookingRepository.checkVacantRoomRepository(
      data,
    );
    if (vacantRoom) {
      return await this.bookingRepository.createBookingRepository(data);
    } else {
      return 'The room is taken for the given time slot';
    }
  }

  async getAllBookingService() {
    return await this.bookingRepository.getAllBookingRepository();
  }
}
