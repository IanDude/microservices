import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.findAll')
  async findUsers() {
    return await this.usersService.findAll();
  }

  @MessagePattern('users.findOne')
  async findOne(@Payload() data: { user_uuid: string }) {
    return await this.usersService.findOne(data.user_uuid);
  }
}
