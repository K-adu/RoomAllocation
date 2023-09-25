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

    //tyo given time lai split garne
    startDate.setHours(
      parseInt(data.startTime.split(':')[0], 10),
      parseInt(data.startTime.split(':')[1], 10),
    );
    endDate.setHours(
      parseInt(data.endTime.split(':')[0], 10),
      parseInt(data.endTime.split(':')[1], 10),
    );

    // tyo hours floor and day ma booking cha ki nai check garne
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

  async getAllBookingRepository() {
    try {
      const bookings = await this.bookingModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'hostName',
            foreignField: '_id',
            as: 'host',
          },
        },
        {
          $unwind: '$host',
        },
        {
          $project: {
            _id: 1,
            eventName: 1,
            description: 1,
            floor: 1,
            startTime: 1,
            endTime: 1,
            date: 1,
            guests: 1,
            'host.email': 1,
          },
        },
        {
          $sort: {
            date: 1, // Sort by date in ascending order
            startTime: 1,
          },
        },
      ]);

      return bookings;
    } catch (error) {
      //databse query error
      throw error;
    }
  }
}
