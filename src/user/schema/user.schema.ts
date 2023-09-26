import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class User extends Document {
  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ required: false, default: null })
  @Field()
  fullName: string;

  @Prop({ required: false, default: null })
  @Field()
  phoneNumber: number;

  @Prop({ required: false, default: null })
  @Field()
  designation: number;

  @Prop({ required: false, default: null })
  @Field()
  floor: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
