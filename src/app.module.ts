import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'db',
      entities: [Post],
      synchronize: true,
    }),
    PostsModule,
    ClientsModule.register([
      {
        name: 'POST_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'post',
          protoPath: join(__dirname, '../src/proto/post.proto'),
        },
      },
    ]),
  ],
})
export class AppModule {}
