import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: null })
  fullName: string;

  @Prop({ required: false, default: null })
  phoneNumber: number;

  @Prop({ required: false, default: null })
  designation: number;

  @Prop({ required: false, default: null })
  floor: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
