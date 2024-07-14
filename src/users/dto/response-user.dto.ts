import { CreateUserDto } from './create-user.dto';

export type ResponseUser = Omit<CreateUserDto, 'password'>;
