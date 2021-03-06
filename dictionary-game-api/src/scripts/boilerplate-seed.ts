// scripts/seed.ts
import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';

import { User } from '../model/user.entity';
import { UsersService } from '../modules/users/users.service';
import { UserDTO } from '../modules/users/users.dto';

async function run() {
  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const usersService = new UsersService(connection.getRepository(User));

  const work = usersService.create(
    UserDTO.from({
      name: 'Rubén',
      email: 'raxanon3@gmail.com',
      password: 'prueba',
    }),
  );
  return await work;
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));
