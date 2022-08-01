import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoleProtected } from '../usuario/auth/decorators/role-protected.decorator';
import { ValidRoles } from '../usuario/auth/interface';

import { JwtAuthGuard } from '../usuario/auth/local-auth.guard';
import { UserRoleGuard } from '../usuario/auth/user-role.guard';
import { RegistroService } from './registro.service';
import { Registro } from './regitro.entity';
import { transporter } from './correo/node-mailer';

@Controller('registro')
export class RegistroController {
  constructor(private registroService: RegistroService) {}

  @Get(':id')
  @RoleProtected(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  get(@Param('id', ParseIntPipe) id: number): Promise<Registro> {
    return this.registroService.get(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req): Promise<Registro[]> {
    const trabajadorId = req.user.Trabajadores.id;
    return this.registroService.getAll(trabajadorId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() registro: Registro, @Request() req): Promise<Registro> {
    const trabajadorId = req.user.Trabajadores.id;
    const correo = req.user.email;
    const trabajador =
      req.user.Trabajadores.nombre + ' ' + req.user.Trabajadores.apellido;
    const rut = req.user.Trabajadores.rut;
    const entradaNueva = new Date(registro.entrada);
    const entrada = this.extractHoras(entradaNueva);
    const fechaEntrada = this.extractDate(entradaNueva);
    const salidaNueva = new Date(registro.salida);
    const salida = this.extractHoras(salidaNueva);
    const fechaSalida = this.extractDate(salidaNueva);

    if (registro.entrada) {
      await transporter.sendMail({
        from: '"Entrada" <desector123@gmail.com>', // sender address
        to: correo, // list of receivers
        subject: 'Entrada', // Subject line // plain text body
        html: `<b>Marca: Entrada</b>
               <br/>
               <b>Nombre: ${trabajador}</b>
               <br/>
               <b>Rut: ${rut}</b>
               <br/>
               <b>Fecha: ${fechaEntrada}</b>
               <br/>
               <b>Hora: ${entrada}</>`, // html body
      });
    }
    if (registro.salida) {
      await transporter.sendMail({
        from: '"Salida " <desector123@gmail.com>', // sender address
        to: correo, // list of receivers
        subject: 'Salida', // Subject line // plain text body
        html: `<b>Marca: Salida</b>
               <br/>
               <b>Nombre: ${trabajador}</b>
               <br/>
               <b>Rut: ${rut}</b>
               <br/>
               <b>Fecha: ${fechaSalida}</b>
               <br/>
               <b>Hora: ${salida}</b>`, // html body
      });
    }

    return this.registroService.create(registro, trabajadorId);
  }

  @RoleProtected(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() registro: Registro,
  ): Promise<void> {
    return this.registroService.update(id, registro);
  }

  @RoleProtected(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.registroService.delete(id);
  }

  private extractHoras(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let final = '';

    hours < 10 ? (final += `0${hours}:`) : (final += `${hours}:`);
    minutes < 10 ? (final += `0${minutes}:`) : (final += `${minutes}:`);
    seconds < 10 ? (final += `0${seconds}`) : (final += `${seconds}`);

    return final;
  }

  private extractDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let final = '';

    day < 10 ? (final += `0${day}-`) : (final += `${day}-`);
    month < 10 ? (final += `0${month}-`) : (final += `${month}-`);
    final += `${year} `;

    return final;
  }
}
