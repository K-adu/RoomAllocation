import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../booking.repository';

@Injectable()
export class TimeService {
  constructor(private bookingRepository: BookingRepository) {}
  async timeHandlerAMPM(data) {
    const startDate = new Date(data.date);
    const endDate = new Date(data.date);

    const startTimeParts = data.startTime.split(' ');
    const endTimeParts = data.endTime.split(' ');

    const startHourMinuteAM = startTimeParts[0].split(':');
    const endHourMinuteAM = endTimeParts[0].split(':');

    let startHourAM = parseInt(startHourMinuteAM[0], 10);
    const startMinuteAM = parseInt(startHourMinuteAM[1], 10);
    let endHourAM = parseInt(endHourMinuteAM[0], 10);
    const endMinuteAM = parseInt(endHourMinuteAM[1], 10);

    if (startTimeParts[1] === 'PM' && startHourAM !== 12) {
      startHourAM += 12;
    }
    if (endTimeParts[1] === 'PM' && endHourAM !== 12) {
      endHourAM += 12;
    }
    startDate.setHours(startHourAM, startMinuteAM);
    endDate.setHours(endHourAM, endMinuteAM);

    //yesma repo call garne
    const existingBookingAM =
      await this.bookingRepository.checkVacantRoomRepository(data);

    if (existingBookingAM) {
      return false; // Room is not vacant for AM format
    }
    const startHourMinutePM = startTimeParts[0].split(':');
    const endHourMinutePM = endTimeParts[0].split(':');

    let startHourPM = parseInt(startHourMinutePM[0], 10);
    const startMinutePM = parseInt(startHourMinutePM[1], 10);
    let endHourPM = parseInt(endHourMinutePM[0], 10);
    const endMinutePM = parseInt(endHourMinutePM[1], 10);

    if (startTimeParts[1] === 'AM' && startHourPM === 12) {
      startHourPM = 0;
    }
    if (endTimeParts[1] === 'AM' && endHourPM === 12) {
      endHourPM = 0;
    }

    startDate.setHours(startHourPM, startMinutePM);
    endDate.setHours(endHourPM, endMinutePM);

    const existingBookingPM =
      await this.bookingRepository.checkVacantRoomRepository(data);
    if (existingBookingPM) {
      return false; // Room is not vacant for PM format
    }
    return true;
  }
}
