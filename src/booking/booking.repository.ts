import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './schema/booking.schema';
import mongoose from 'mongoose';
import useId from '@mui/material/utils/useId';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(Booking.name) private bookingModel: mongoose.Model<Booking>,
  ) {}

  async createBookingRepository(data) {
    return await this.bookingModel.create(data);
  }

  async checkVacantRoomRepository(data, bookingId = null) {
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
            { startTime: { $lt: data.endTime } },
            { endTime: { $gt: data.endTime } },
          ],
        },
      ],
      _id: { $ne: data.bookingId },
    });
    return existingBooking;
  }

  async getAllBookingRepository(filter) {
    try {
      const filterDate = filter.date;
      const filterFloor = filter.floor;
      const currentDate = new Date();

      const pipeline = [];

      pipeline.push({
        $match: {
          date: { $gte: filterDate },
        },
      });

      if (filterFloor) {
        pipeline.push({
          $match: {
            floor: filterFloor,
          },
        });
      }

      pipeline.push(
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
            'host._id': 1,
            'host.email': 1,
            'host.fullName': 1,
          },
        },
        {
          $sort: {
            date: 1,
            startTime: 1,
          },
        },
      );

      const bookings = await this.bookingModel.aggregate(pipeline);

      return bookings;
    } catch (error) {
      throw error;
    }
  }

  async getMyBookingRepository(userId) {
    try {
      const currentDate = new Date();
      return await this.bookingModel.find({
        hostName: userId,
        date: { $gte: currentDate },
      });
    } catch (error) {
      throw error;
    }
  }

  async checkLoggedInUserBooking(bookingId, userId) {
    const data = await this.bookingModel.findOne({
      hostName: userId,
      _id: bookingId,
    });

    return data;
  }

  async getAllOngoingMeetingsRepository() {
    try {
      const filterDate = new Date();
      const pipeline = [];

      const ongoingMeetingsByFloor = await this.bookingModel.aggregate([
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
          $match: {
            $expr: {
              $and: [
                { $lte: [{ $toDate: '$startTime' }, filterDate] },
                { $gt: [{ $toDate: '$endTime' }, filterDate] },
              ],
            },
          },
        },
        {
          $group: {
            _id: '$floor',
            meetings: { $push: '$$ROOT' },
          },
        },
        {
          $project: {
            meetings: {
              _id: 1,
              eventName: 1,
              description: 1,
              floor: 1,
              startTime: 1,
              endTime: 1,
              date: 1,
              guests: 1,
              'host._id': 1,
              'host.email': 1,
              'host.fullName': 1,
            },
          },
        },
      ]);
      return ongoingMeetingsByFloor;
    } catch (error) {
      throw error;
    }
  }

  async editBookingRepository(bookingId, data) {
    const world = await this.bookingModel.findByIdAndUpdate(bookingId, data);
    return world;
  }
  async deleteBookingRepository(id) {
    try {
      return await this.bookingModel.findByIdAndDelete(id);
    } catch (e) {
      throw new UnauthorizedException('You cannot delete the post');
    }
  }
}
