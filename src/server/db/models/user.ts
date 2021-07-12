import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'users',
})
class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        field: 'id',
    })
    user_id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    login: string;

    @Column(DataType.STRING)
    avatar: string;
}

export default User;
