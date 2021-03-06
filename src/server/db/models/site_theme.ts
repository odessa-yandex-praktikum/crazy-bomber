import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Index,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from 'sequelize-typescript';

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'site_theme',
})
export class SiteTheme extends Model<SiteTheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Unique
    @Index
    @Column(DataType.STRING)
    theme: string;
}
