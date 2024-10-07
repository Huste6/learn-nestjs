import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//extends kế thừa thằng CreateUserDto,
//OmitType bo di thuoc tinh password
export class UpdateUserDto extends OmitType(CreateUserDto,['password'] as const) {
    _id: string;
}
