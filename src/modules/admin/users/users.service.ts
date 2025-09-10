import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import e from 'express';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {email,password,  ...rest } = createUserDto;
    // verificar si ya existe el email
    const existeUsername = await this.userRepository.findOne({where: {username: rest.username}});
    if (existeUsername) {
      throw new BadRequestException(`El username "${rest.username}" ya existe`);
    }else {
      const existeEmail = await this.userRepository.findOne({where: {email}});  
      if (existeEmail) {
        throw new BadRequestException(`El email "${email}" ya existe`);
      }
      
      const newUser = this.userRepository.create({
        ...rest, email, password
      });
      return this.userRepository.save(newUser);

      
    }
    return 'This action adds a new user';
  }

  findAll(): Promise<User[]> {

    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException(`El usuario con id "${id}" no existe`);
    }
    return user;

  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
    // return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if(result.affected === 0){
      throw new NotFoundException(`El usuario con id "${id}" no existe`);
    }
  }
}
