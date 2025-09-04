import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5422, 
      username: 'postgres',
      password: 'Chelo1965*',
      database: 'bd_backend_nest',
      entities: [],
      synchronize: true, 
    })
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
