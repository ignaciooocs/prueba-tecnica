import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'demo',
            password: 'demo',
            database: 'demo',
            entities: [User],
            synchronize: true
        })
    ]
})
export class DatabaseModule {}
