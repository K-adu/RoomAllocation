import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
@Schema()
export class Booking extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  hostName: string;

  @Prop({ required: true })
  eventName: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  floor: string;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  notifyTime: Date;

  @Prop({ type: [String], required: true }) // Array of emails
  guests: string[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
