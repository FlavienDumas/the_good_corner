import { Controller } from ".";
import { Request, Response } from "express";
import { Tag } from "../entities/Tag";
import { Like } from "typeorm";
import { validate } from "class-validator";

export class TagController extends Controller{
    getAll = async (req: Request, res: Response) =>{
        try {
            const tagName = req.query.name;
            let tags;
            if (typeof(tagName) === "string") {
              tags = await Tag.find({
                where: {
                  name: Like(`%${tagName}%`)
                },
              })
            } else {
              tags = await Tag.find();
            }
            res.send(tags);
        } catch (err){
            console.log(err);
            res.status(500).send();
        }
    }
    createOne = async (req: Request, res: Response)=>{
        try {
            const newTag = new Tag();
            if (req.body.hasOwnProperty("id")) {
              const safeBody = req.body;
              delete safeBody.id;
              Object.assign(newTag, safeBody);
            } else {
              Object.assign(newTag, req.body);
            }
            const errors = await validate(newTag);
            if (errors.length === 0) {
              await newTag.save();
              res.send(newTag);
            } else {
              console.log(errors)
            }
          } catch (err) {
            console.log(err);
            res.status(500).send();
          }
    }
    deleteOne = async (req: Request, res: Response)=>{
      try{
          const targetTagId: number = Number(req.params.id);
          const targetTag = await Tag.findOneBy({id: targetTagId});
          if (targetTag){
            await targetTag.remove();
            console.log(`Tag ${targetTagId} supprimé`)
          }
          res.send(targetTag);
        } catch (err) {
          console.log(err);
          res.status(500).send();
        }
    }
  patchOne = async (req: Request, res: Response)=>{
    try {
        const targetTagId: number = Number(req.params.id);
        const targetTag = await Tag.findOneBy({id: targetTagId});
        if (targetTag) {
          Object.assign(targetTag, req.body, {id : targetTag.id});
          await targetTag.save();
          res.send(targetTag);
          console.log(`Tag ${targetTagId} modifié`)
        } else {
          console.log(`Le tag ${targetTagId} n'existe pas`)
        }
      } catch (err) {
        console.log(err);
        res.status(500).send();
      } 
    }
}