import { Injectable } from "@nestjs/common";
import { IUser } from "./interfaces/user.interface";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async findById(id: number): Promise<IUser> {
    return this.userRepository.findById(id);
  }
}