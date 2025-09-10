import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/admin/users/users.module';
import { User } from './modules/admin/users/entities/user.entity';

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
      entities: [User],
      synchronize: true, 
    }),
    UsersModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
