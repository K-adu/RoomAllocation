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
    //afno bahek aru ko check hanne ki slot khali cha ki nai bhanerah
    const userId = req.user.id;
    let isPost = await this.bookingRepository.checkLoggedInUserBooking(
      bookingId,
      userId,
    );
    if (!isPost) {
      throw new NotAcceptableException('You cannot edit the post');
    }
    const update: any = {};
    const fieldsToCheck = [
      'eventName',
      'description',
      'date',
      'floor',
      'startTime',
      'endTime',
      'guests',
    ];

    // Iterate through the fields and update if not null
    for (const field of fieldsToCheck) {
      if (data[field] !== null && data[field] !== undefined) {
        update[field] = data[field];
      }
    }
    console.log('this is from the service checking null', update);
    // const editedPost = {
    //   ...isPost,
    //   ...update,
    // };
    // console.log(isPost)
    // console.log('this is from he edited post service', editedPost);
    const isVacantSlot = this.bookingRepository.checkVacantRoomRepository(
      update,
      bookingId,
    );

    if (!isVacantSlot) {
      throw new NotAcceptableException(
        'The following slot of the booking is taken',
      );
    }

    return await this.bookingRepository.editBookingRepository(bookingId, data);
  }
}
