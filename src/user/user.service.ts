import { Injectable, UnauthorizedException, InternalServerErrorException, Scope, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private jwtService: JwtService
  ) {

  }
  // Create New User..................................................
  async create(createUserDto: CreateUserDto) {
    try {
      const { firstName, lastName, email, password } = createUserDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = hashedPassword;
     
      return this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    };
  }

  // User login and token generation..................................
  async login(req:any,loginUserDto: LoginUserDto) {    
      const { email, password } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { email: email },
        select: ['id', "email", "firstName", "lastName", "password"],
      })

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const passwordIsValid = await user.validatePassword(password);

      if (!passwordIsValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = { userid: user.id, email: user.email };
      const accessToken = await this.jwtService.signAsync(payload,{secret:process.env.JWT_SECRET});
      req.session.user = payload;
      return { access_token: accessToken };
  }

  //view user profile....................................................
  findOne(id: number) {
    try {
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    };
  }

  //get user by email...................................................
  async getUserByEMail(email: string){
    const user = await this.userRepository.findOne({
      where: { email: email }
    })

    return user;
  }
}
