import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column()
    @Exclude()
    avatar: string;

    @Expose({ name: 'avatarUrl' })
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk': {
                return this.avatar
                    ? `${process.env.APP_API_URL}/files/${this.avatar}`
                    : null;
            }
            case 's3': {
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
            }
            default: {
                return null;
            }
        }
    }
}

export default User;
