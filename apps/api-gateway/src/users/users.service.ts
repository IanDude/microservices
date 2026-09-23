import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}

  findAll() {
    return this.userClient.send('users.findAll', {});
  }

  findOne(uuid: string) {
    return this.userClient.send('users.findOne', { user_uuid: uuid });
  }
}
