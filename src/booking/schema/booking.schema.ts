import { Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
@Schema()
export class Booking extends Document {
  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  hostName: string;

  @Field()
  @Prop({ required: true })
  eventName: string;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field()
  @Prop({ required: true })
  floor: string;

  @Field()
  @Prop({ required: true })
  startTime: string;

  @Field()
  @Prop({ required: true })
  endTime: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ required: true })
  notifyTime: Date;

  @Field(() => [String])
  @Prop({ type: [String], required: true }) // Array of emails
  guests: string[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
