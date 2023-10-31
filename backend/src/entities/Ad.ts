import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Category } from "./Category";
import { Tag } from "./Tag"
import { Length } from "class-validator";
import { ObjectId } from "./ObjectId";

@Entity()
@ObjectType()
export class Ad extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field(()=> ID)
    id!: number;

    @Column({length: 100})
    @Length(3, 100)
    @Field()
    title!: string;

    @Column()
    @Length(3, 2000)
    @Field()
    description!: string;

    @Column({length: 100})
    @Length(3, 50)
    @Field()
    owner!: string;

    @Column()
    @Field()
    price!: number;

    @Column({nullable: true, length: 300})
    @Field()
    picture!: string;

    @Column({length: 100})
    @Length(3, 50)
    @Field()
    location!: string;

    @Column()
    @Field()
    createdAt!: Date;

    @ManyToOne(() => Category, (Category) => Category.ads)
    @Field(()=> Category)
    category!: Category;

    @ManyToMany(()=> Tag, (tag) => tag.ads)
    @JoinTable()
    @Field(()=> [Tag])
    tags!: Tag[];
}

@InputType()
export class AdInput{
    @Field()
    title!: string;
    @Field()
    description!: string;
    @Field()
    owner!: string;
    @Field()
    price!: number;
    @Field()
    picture!: string;
    @Field()
    location!: string;
    @Field()
    category!: ObjectId;
    @Field(()=> [ObjectId], {nullable: true})
    tags!: ObjectId[];
}