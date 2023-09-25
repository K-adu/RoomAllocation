import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';

@Injectable()
export class BookingService {
  constructor(private bookingRepository: BookingRepository) {}

  /* create garda kheri kasari create garney
        first ma ta tyo floor and tyo time ma typ date ma
        booking available cha ki nei herne
        ani if chaina bhane matra create garne natra say "already booked"
  */
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
}
