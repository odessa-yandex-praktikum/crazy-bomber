import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Index,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import Topic from './topic';
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
    @ForeignKey(() => Topic)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    topic_id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    author_id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    text: string;
}

export default Message;
