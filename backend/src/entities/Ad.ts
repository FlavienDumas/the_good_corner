import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag"
import { Length, ValidateIf, IsInt } from "class-validator";

@Entity()
export class Ad extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({length: 100})
    @Length(3, 100)
    title!: string;
    @Column()
    @Length(3, 2000)
    description!: string;
    @Column({length: 100})
    @Length(3, 50)
    owner!: string;
    @Column()
    @Length(1, 50)
    price!: number;
    @Column({nullable: true, length: 300})
    picture!: string;
    @Column({length: 100})
    @Length(3, 50)
    location!: string;
    @Column()
    createdAt!: Date;
    @ManyToOne(() => Category, (Category) => Category.ads)
    category!: Category;
    @ManyToMany(()=> Tag, (tag) => tag.id)
    @JoinTable()
    tags!: Tag[];
}