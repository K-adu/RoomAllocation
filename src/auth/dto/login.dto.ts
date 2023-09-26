import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field()
  email: string;
}
