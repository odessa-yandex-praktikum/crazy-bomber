import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    Default,
    HasMany,
    Index,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import User from './user';

@Table({
    timestamps: true,
    paranoid: true,
    tableName: 'messages',
})
class Message extends Model<Message> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Index
    @AllowNull(false)
    @Column(DataType.STRING)
    text: string;

    @Default(0)
    @Column(DataType.INTEGER)
    likes: number;

    @HasMany(() => Message, 'parent_id')
    reply: Message;

    @BelongsTo(() => User, 'user_id')
    author: User;
}

export default Message;
