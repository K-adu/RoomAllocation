import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class OtpDto {
  @Field()
  email: string;

  @Field()
  otp: string;
}

@ObjectType()
export class OtpMail {
  @Field()
  otpBool: boolean;
}
