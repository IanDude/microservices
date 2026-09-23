import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.findAll')
  async findUsers() {
    return await this.usersService.findAll();
  }

  @MessagePattern('users.findOne')
  findOne(@Payload() data: { user_uuid: string }) {
    try {
      return `Should be user with ${data.user_uuid}`;
    } catch (error) {
      throw new RpcException(error);
    }
    // return await this.usersService.findOne(data.user_uuid);
  }
}
