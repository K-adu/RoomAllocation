import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
//@ts-ignore
import { EditUserDto, FileUpload, UploadInput } from './dto/edit.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from './schema/user.schema';

import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
//fileupload imports
//@ts-ignore
// import { GraphQLUpload, FileUpload } from 'graphql-upload';
import * as fs from 'fs';
@Resolver(() => 'User')
export class UserResolver {
  constructor(private userService: UserService) {}
  // @Mutation(() => String)
  // async uploadFile(@Args('input') input: UploadInput): Promise<string> {
  //   const uploadedFile = input.file;
  //   return 'File uploaded successfully.';
  // }
  @Query(() => User)
  async dummmy() {
    const a = 'hello';
    return a;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async editUser(
    @Args('edit') data: EditUserDto,
    @Context() context: { req: Request },
  ) {
    console.log(data);
    const { req } = context;
    await this.userService.editUserService(req, data);
    return true;
  }

  // @Mutation(() => Boolean)
  // async uploadProfilePic(
  //   @Args('input', { type: () => GraphQLUpload }) file: FileUpload,
  //   @Context() context: { req: Request },
  // ): Promise<boolean> {
  //   const { req } = context;

  //   // Handle the uploaded image here
  //   const { createReadStream, filename } = await file;
  //   const stream = createReadStream();
  //   // Example: Save the uploaded image to a specific directory
  //   //send the data to service and upload it to s3 bucket
  //   //return the string of the image and save it to the database
  //   const path = `./uploads/${filename}`;
  //   const writeStream = fs.createWriteStream(path);

  //   await new Promise((resolve, reject) => {
  //     stream.pipe(writeStream);
  //     writeStream.on('finish', resolve);
  //     writeStream.on('error', reject);
  //   });

  //   return true;
  // }
}
