import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export interface UserWithoutPassword {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    avatar: string;
}

@Entity('users')
class User implements UserWithoutPassword {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column()
    avatar: string;

    public getUserWithoutPassword(): UserWithoutPassword {
        const userWithoutPassword = {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            avatar: this.avatar,
        };

        return userWithoutPassword;
    }
}

export default User;
