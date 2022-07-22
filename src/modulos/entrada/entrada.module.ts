import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EntradaController } from './entrada.controller';
import { EntradaService } from './entrada.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [EntradaController],
  providers: [EntradaService],
})
export class EntradaModule {}
