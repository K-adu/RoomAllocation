import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './schema/booking.schema';
import mongoose from 'mongoose';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(Booking.name) private bookingModel: mongoose.Model<Booking>,
  ) {}

  async createBookingRepository(data) {
    console.log(data);
    return await this.bookingModel.create(data);
  }

  async checkVacantRoomRepository(data) {
    if (data.startTime === data.endTime) {
      return 'startTime cannot be equal to end time';
    }

    const startDate = new Date(data.date);
    const endDate = new Date(data.date);

    // Set the start and end times based on the provided startTime and endTime
    startDate.setHours(
      parseInt(data.startTime.split(':')[0], 10),
      parseInt(data.startTime.split(':')[1], 10),
    );
    endDate.setHours(
      parseInt(data.endTime.split(':')[0], 10),
      parseInt(data.endTime.split(':')[1], 10),
    );

    // Query the database to check for existing bookings on the same floor and within the specified time range
    const existingBooking = await this.bookingModel.findOne({
      floor: data.floor,
      date: data.date,
      $or: [
        {
          $and: [
            { startTime: { $lte: data.startTime } },
            { endTime: { $gte: data.startTime } },
          ],
        },
        {
          $and: [
            { startTime: { $lte: data.endTime } },
            { endTime: { $gte: data.endTime } },
          ],
        },
      ],
    });

    if (existingBooking) {
      return false; // Room is not vacant
    }

    return true; // Room is vacant
  }

  //euta api to display all the bookings order by type

  // arko api to display all the bookings that i booked

  //arko api to edit the bookings that i booked

  //arko api to delete the bookings that i booked
}
