import { DataSource } from 'typeorm';
import { getTypeOrmConfig } from '../../config/typeorm.config';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/users.entity';
import { randomUUID } from 'crypto';
import { Roles } from '../entities/roles.entitys';
import { Permissions } from '../entities/permissions.entitys';
import { Todo } from '../entities/todo.entitys';

const seed = async (configService: ConfigService) => {
  const dataSource = new DataSource(getTypeOrmConfig(configService));
  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Roles);
  const permissionRepository = dataSource.getRepository(Permissions);
  const todoRepository = dataSource.getRepository(Todo);

  const createUsers = permissionRepository.create({
    uuid: randomUUID(),
    name: 'users:create',
  });
  await permissionRepository.save(createUsers);

  const viewUsers = permissionRepository.create({
    uuid: randomUUID(),
    name: 'users:view',
  });
  await permissionRepository.save(viewUsers);

  const viewAnyUsers = permissionRepository.create({
    uuid: randomUUID(),
    name: 'users:view_any',
  });
  await permissionRepository.save(viewAnyUsers);

  const viewAllUsers = permissionRepository.create({
    uuid: randomUUID(),
    name: 'users:view_all',
  });
  await permissionRepository.save(viewAllUsers);

  const updateUsers = permissionRepository.create({
    uuid: randomUUID(),
    name: 'users:update',
  });
  await permissionRepository.save(updateUsers);

  const updateAnyUsers = permissionRepository.create({
    uuid: randomUUID(),
    name: 'users:update_any',
  });
  await permissionRepository.save(updateAnyUsers);

  const updateAllUsers = permissionRepository.create({
    uuid: randomUUID(),
    name: 'users:update_all',
  });
  await permissionRepository.save(updateAllUsers);

  const deleteUsers = permissionRepository.create({
    uuid: randomUUID(),
    name: 'users:delete',
  });
  await permissionRepository.save(deleteUsers);

  const deleteAnyUsers = permissionRepository.create({
    uuid: randomUUID(),
    name: 'users:delete_any',
  });
  await permissionRepository.save(deleteAnyUsers);

  const adminRole = roleRepository.create({
    uuid: randomUUID(),
    name: 'admin',
    permission: [
      createUsers,
      viewUsers,
      viewAnyUsers,
      viewAllUsers,
      updateUsers,
      updateAnyUsers,
      updateAllUsers,
      deleteUsers,
      deleteAnyUsers,
    ],
  });
  await roleRepository.save(adminRole);
  const moderatorRole = roleRepository.create({
    uuid: randomUUID(),
    name: 'moderator',
    permission: [
      viewUsers,
      viewAnyUsers,
      viewAllUsers,
      updateUsers,
      updateAnyUsers,
      updateAllUsers,
    ],
  });
  await roleRepository.save(moderatorRole);
  const userRole = roleRepository.create({
    uuid: randomUUID(),
    name: 'user',
    permission: [viewUsers, updateUsers],
  });
  await roleRepository.save(userRole);

  const adminUser = userRepository.create({
    uuid: randomUUID(),
    username: 'admin',
    email: 'admin@email.com',
    password:
      '$argon2id$v=19$m=4096,p=1,t=3$81kW+3nW+5KqhZa9E6PmBQ$2YJvc+L1slJhkEkoRmMjOWqp8bSZYM6R9MxOYCu2znI',
    role: [adminRole],
  });

  await userRepository.save(adminUser);

  const user2 = userRepository.create({
    uuid: randomUUID(),
    username: 'user2',
    email: 'user2@email.com',
    password:
      '$argon2id$v=19$m=4096,p=1,t=3$81kW+3nW+5KqhZa9E6PmBQ$2YJvc+L1slJhkEkoRmMjOWqp8bSZYM6R9MxOYCu2znI',
    role: [moderatorRole, userRole],
  });
  await userRepository.save(user2);
  const user3 = userRepository.create({
    uuid: randomUUID(),
    username: 'user3',
    email: 'user3@email.com',
    password:
      '$argon2id$v=19$m=4096,p=1,t=3$81kW+3nW+5KqhZa9E6PmBQ$2YJvc+L1slJhkEkoRmMjOWqp8bSZYM6R9MxOYCu2znI',
    role: [adminRole, moderatorRole],
  });
  await userRepository.save(user3);
  const user4 = userRepository.create({
    uuid: randomUUID(),
    username: 'user4',
    email: 'user4@email.com',
    password:
      '$argon2id$v=19$m=4096,p=1,t=3$81kW+3nW+5KqhZa9E6PmBQ$2YJvc+L1slJhkEkoRmMjOWqp8bSZYM6R9MxOYCu2znI',
    role: [userRole],
  });
  await userRepository.save(user4);
  const user5 = userRepository.create({
    uuid: randomUUID(),
    username: 'user5',
    email: 'user5@email.com',
    password:
      '$argon2id$v=19$m=4096,p=1,t=3$81kW+3nW+5KqhZa9E6PmBQ$2YJvc+L1slJhkEkoRmMjOWqp8bSZYM6R9MxOYCu2znI',
    role: [userRole],
  });
  await userRepository.save(user5);

  const todo1 = todoRepository.create({
    uuid: randomUUID(),
    title: 'Task 1',
    description: 'Todo Task #1 from seeders',
    dueDate: new Date(),
    assignee: user2,
  });
  await todoRepository.save(todo1);

  const todo2 = todoRepository.create({
    uuid: randomUUID(),
    title: 'Task 2',
    description: 'Todo Task #2 from seeders',
    dueDate: new Date(),
    assignee: user3,
  });
  await todoRepository.save(todo2);

  const todo3 = todoRepository.create({
    uuid: randomUUID(),
    title: 'Task 3',
    description: 'Todo Task #3 from seeders',
    dueDate: new Date(),
    assignee: user4,
  });
  await todoRepository.save(todo3);

  const todo4 = todoRepository.create({
    uuid: randomUUID(),
    title: 'Task 4',
    description: 'Todo Task #4 from seeders',
    dueDate: new Date(),
    assignee: user5,
  });
  await todoRepository.save(todo4);

  const todo5 = todoRepository.create({
    uuid: randomUUID(),
    title: 'Task 5',
    description: 'Todo Task #5 from seeders',
    dueDate: new Date(),
    assignee: user5,
  });
  await todoRepository.save(todo5);

  await dataSource.destroy();
};

const configService = new ConfigService();
seed(configService)
  .then(() => {
    console.log('Seeded');
  })
  .catch((err) => {
    console.error(err);
  });
