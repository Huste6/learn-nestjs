import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // -> /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // controller la thang dieu huong, phan phoi cong viec 
  //service co kha nang ket noi voi database

  @Post()
  create(
    // @Body("email") myEmail: string,
    // @Body("password") password: string,
    // @Body("name") name: string,
    @Body() createUserDto: CreateUserDto
  )
  {
    //const myEmail = req.body.email;

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    //const id: string = req.params.id;
    // return id;
    // return this.usersService.findOne(+id); // + có nghĩa là convert string sang number
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
