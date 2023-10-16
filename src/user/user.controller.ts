import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode } from '@nestjs/common';
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
  @HttpCode(200)
  async login(@Req() req: any, @Body() loginUserDto: LoginUserDto) {
    return this.userService.login(req,loginUserDto);
  }

  @Get('me')
  findOne(@Req() req: any) {
    const id = req.userid
    return this.userService.findOne(id);
  }

  @Get('logout')
  async logout(@Req() req : any) {
    req.session.destroy();
    return { message: 'User logout successfully' };
  }
}
