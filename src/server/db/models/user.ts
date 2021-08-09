import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from 'sequelize-typescript';

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'users',
})
class User extends Model<User> {
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @PrimaryKey
    @Unique
    @Column(DataType.INTEGER)
    user_id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    login: string;

    @Column(DataType.STRING)
    avatar: string;
}

export default User;
