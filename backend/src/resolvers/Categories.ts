import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { validate } from "class-validator";

@Resolver(Category)
export class CategoriesResolver {
    @Query(()=>[Category])
    async allCategories(): Promise<Category[]> {
        return await Category.find({relations : {
            ads: true
        }});
    }

    @Query(()=> Category, {nullable: true})
    async getOneCategory(@Arg("id") id: number): Promise<Category | null> {
      return await Category.findOne({where:{
        id: id
      },
      relations : {
        ads: true
    }});
    }

    @Mutation(() => Category)
    async createCategory(@Arg("name") name: string): Promise<Category> {
        const newCategory = new Category();
        newCategory.name = name;

        const errors = await validate(newCategory);
            if (errors.length === 0) {
              await newCategory.save();
              return (newCategory);
            } else {
              throw new Error(`Error occured : ${JSON.stringify(errors)}`)
            }
    }
}