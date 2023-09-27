import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  // user cha ki nai check hanne
  async checkUserExistRepository(email) {
    return await this.userModel.findOne({ email: email });
  }
  async addUserToDbRepository(data) {
    console.log('this is printing form the repository', data);
    return await this.userModel.create(data);
  }

  async editUserRepository(id, data) {
    const edited = await this.userModel.findByIdAndUpdate(id, data);
    console.log(edited);
  }
}
