import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';


@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {    
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get('me')
  findOne(@Req() req: any) {
    const id = req.userid
    return this.userService.findOne(id);
  }

  @Post('logout')
  async logout(@Req() req : any) {
    const token = req.headers.authorization.split(' ')[1];
    return { message: 'Logged out successfully' };
  }
}
