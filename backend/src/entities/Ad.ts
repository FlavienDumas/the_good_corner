import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag"

@Entity()
export class Ad extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({length: 100})
    title!: string;
    @Column()
    description!: string;
    @Column({length: 100})
    owner!: string;
    @Column()
    price!: number;
    @Column({nullable: true, length: 300})
    picture!: string;
    @Column({length: 100})
    location!: string;
    @Column()
    createdAt!: Date;
    @ManyToOne(() => Category, (Category) => Category.ads)
    category!: Category;
    @ManyToMany(()=> Tag, (Tag) => Tag.id)
    @JoinTable()
    tags!: Tag[];
}