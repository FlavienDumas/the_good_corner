import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdInput } from "../entities/Ad";
import { validate } from "class-validator";

@Resolver(Ad)
export class AdsResolver {
    @Query(()=>[Ad])
    async allAds(): Promise<Ad[]> {
      return await Ad.find({relations : {
          tags: true,
          category: true
      }});
    }

    @Query(()=> Ad, {nullable: true})
    async getOneAd(@Arg("id") id: number): Promise<Ad | null> {
      return await Ad.findOne({where:{
        id: id
      },
      relations : {
        tags: true,
        category: true
    }});
    }

    @Mutation(() => Ad)
    async createAd(@Arg("data", () => AdInput) data: AdInput): Promise<Ad> {
        const newAd = new Ad();
        Object.assign(newAd, data);
        newAd.createdAt = new Date();

        const errors = await validate(newAd);
            if (errors.length === 0) {
              await newAd.save();
              return (newAd);
            } else {
              throw new Error(`Error occured : ${JSON.stringify(errors)}`)
            }
    }

    @Mutation(() => Ad, {nullable: true})
    async deleteAd(@Arg("id") id: number): Promise<string> {
      const targetAd = await Ad.findOneBy({id: id});

      if (targetAd){
        await targetAd.remove();
        return "opération réussie";
      } else {
        return `l'Ad ${id} n'existe pas`
      }
    }
}