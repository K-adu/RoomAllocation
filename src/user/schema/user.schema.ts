import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class User extends Document {
  @Prop({ required: true, unique: true })
  @Field() // Use appropriate GraphQL types based on your data
  email: string;

  @Prop({ required: false, default: null })
  @Field({ nullable: true }) // Set nullable: true for optional fields
  fullName: string | null;

  @Prop({ required: false, default: null })
  @Field({ nullable: true })
  phoneNumber: string | null;

  @Prop({ required: false, default: null })
  @Field({ nullable: true })
  designation: string | null;

  @Prop({ required: false, default: null })
  @Field({ nullable: true })
  floor: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
