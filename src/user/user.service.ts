import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  // user cha ki nai check hanne
  async checkUserExistService(email) {
    return await this.userRepository.checkUserExistRepository(email);
  }

  async addUserToDbService(data) {
    return await this.userRepository.addUserToDbRepository(data);
  }

  async editUserService(req, data) {
    const userId = req.user.id;
    return await this.userRepository.editUserRepository(userId, data);
  }
}
