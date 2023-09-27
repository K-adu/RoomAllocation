import { InputType, Field } from '@nestjs/graphql';
import { User } from '../schema/user.schema';
import { Stream } from 'stream';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class EditUserDto extends User {
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  fullName: string;
  @Field({ nullable: true })
  phoneNumber: string;
  @Field({ nullable: true })
  designation: string;
  @Field({ nullable: true })
  floor: string;

  @Field({ nullable: true })
  profilePic: string;
}
