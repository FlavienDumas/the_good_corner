import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../entities/Tag";
import { validate } from "class-validator";

@Resolver(Tag)
export class TagsResolver {
    @Query(()=>[Tag])
    async allTags(): Promise<Tag[]> {
        return await Tag.find({relations: {
          ads: true
        }});
    }

    @Query(()=> Tag, {nullable: true})
    async getOneTag(@Arg("id") id: number): Promise<Tag | null> {
      return await Tag.findOne({where:{
        id: id
      },
      relations : {
        ads: true
    }});
    }

    @Mutation(() => Tag)
    async createTag(@Arg("name") name: string): Promise<Tag> {
        const newTag = new Tag();
        newTag.name = name;

        const errors = await validate(newTag);
            if (errors.length === 0) {
              await newTag.save();
              return (newTag);
            } else {
              throw new Error(`Error occured : ${JSON.stringify(errors)}`)
            }
    }
}