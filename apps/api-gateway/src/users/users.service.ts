import { CreateUserDto } from '@app/common/dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}

  findAll() {
    return this.userClient.send('users.findAll', {});
  }

  findOne(uuid: string) {
    return this.userClient.send('users.findOne', { user_uuid: uuid }).pipe(
      catchError((error: Error) => {
        return throwError(() => new NotFoundException(error.message));
      }),
    );
  }

  createOne(body: CreateUserDto) {
    return this.userClient.send('users.createOne', body);
  }
}
