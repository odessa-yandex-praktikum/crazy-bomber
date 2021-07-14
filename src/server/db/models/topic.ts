import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Default,
    ForeignKey,
    Index,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import User from './user';

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

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    author_id: number;

    @Index
    @AllowNull(false)
    @Column(DataType.STRING)
    title: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    text: string;

    @Default(0)
    @Column(DataType.INTEGER)
    likes: number;
}

export default Topic;
