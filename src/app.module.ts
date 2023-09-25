import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BookingModule } from './booking/booking.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    UserModule,
    AuthModule,

    MongooseModule.forRoot('mongodb://localhost:27017/roomallocation'),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: 'hellothisissecret',
    }),
    BookingModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
