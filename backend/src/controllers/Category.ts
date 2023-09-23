import { Controller } from ".";
import { Request, Response } from "express";
import { Category } from "../entities/Category";
import { validate } from "class-validator";
import { Like } from "typeorm";

export class CategoryController extends Controller {
    getAll = async (req: Request, res: Response)=>{
        try {
            const categoryName = req.query.name;
            let categories;
            if (typeof(categoryName) === "string") {
              categories = await Category.find({
                where: {
                  name: Like(`%${categoryName}%`)
                },
              })
            } else {
              categories = await Category.find();
            }
            res.send(categories);
        } catch (err){
            console.log(err);
            res.status(500).send();
        }
    }

    patchOne = async (req: Request, res: Response)=>{
        try {
            const targetCategoryId: number = Number(req.params.id);
            const targetCategory = await Category.findOneBy({id: targetCategoryId});
            if (targetCategory) {
              Object.assign(targetCategory, req.body, {id : targetCategory.id});
              await targetCategory.save();
              res.send(targetCategory);
              console.log(`Catégorie ${targetCategoryId} modifiée`)
            } else {
              console.log(`Catégorie ${targetCategoryId} n'existe pas`)
            }
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    }
}