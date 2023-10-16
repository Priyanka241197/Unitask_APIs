import { Inject, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction } from "express";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(  @Inject(JwtService) private jwtService: JwtService){

    }
    use(req:any, res:Response, next:NextFunction){
        const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new UnauthorizedException('You are not allow to do this action');
    }    
    if(!req.session.user){
        throw new UnauthorizedException('User session is expired!, Please login.');
    }
    try {    
      const decoded = this.jwtService.verify(token,{secret:process.env.JWT_SECRET})  
      req.userid = decoded.userid;
      next();
    } catch (error) {
        throw new UnauthorizedException('Invalid Request');
    }
    }
}