import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasOne,
    Index,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import Message from './message';

@Table({
    timestamps: true,
    paranoid: true,
    tableName: 'topics',
})
class Topic extends Model<Topic> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Index
    @AllowNull(false)
    @Column(DataType.STRING)
    title: string;

    @HasOne(() => Message, 'topic_id')
    message: Message;
}

export default Topic;
