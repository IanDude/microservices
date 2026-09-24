import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './database/entities/users.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    if (users.length === 0) throw new RpcException('No Users Found');
    return users;
  }

  async findOne(uuid: string) {
    const user = await this.usersRepository.findOne({
      where: { uuid: uuid },
      relations: { role: { permission: true } },
    });
    if (!user) throw new RpcException('User is not found');
    return user;
  }
}
