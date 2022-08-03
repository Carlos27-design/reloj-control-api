import { Module } from '@nestjs/common';

import { ModulosModule } from './modulos/modulos.module';
import { MessageWsModule } from './message-ws/message-ws.module';

@Module({
  imports: [ModulosModule, MessageWsModule],
})
export class AppModule {}
