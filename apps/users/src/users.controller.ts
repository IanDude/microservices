import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto';

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

  @MessagePattern('users.createOne')
  async createOne(@Payload() body: CreateUserDto) {
    return await this.usersService.createOne(body);
  }

  @MessagePattern('users.updateOne')
  async updateOne(@Payload() data: { user_uuid: string }) {
    return await this.usersService.updateOne(data.user_uuid);
  }
}
