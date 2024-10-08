import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync,hashSync} from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async create(createUserDto: CreateUserDto){
    let user = await this.userModel.create({
      email: createUserDto.email,
      password: this.hashPassword(createUserDto?.password),
      name: createUserDto.name,
      address: createUserDto.address || ""
    })
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw new NotFoundException('User not found!');
    }
    return this.userModel.findOne({
      _id: id
    }).select("-password");
  }

  async update( updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({
      _id: updateUserDto._id
    },{
      ...updateUserDto
    });
  }

  remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw new NotFoundException('User not found!');
    }
    return this.userModel.deleteOne({_id: id})
  }
}
