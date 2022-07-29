import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  SetMetadata,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto';
import { JwtAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  create(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/perfil')
  getPerfil(@Request() req) {
    return this.authService.getPerfil(req.user.email);
  }
}
