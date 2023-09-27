import { Controller } from ".";
import { Request, Response } from "express";
import { Ad } from "../entities/Ad";
import { Like } from "typeorm";
import { validate } from "class-validator";

export class AdController extends Controller{
    getAll = async (req: Request, res: Response)=>{
        try {
            let ads;
            const categoryName = req.query.category;
            const targetId = req.query.id;
            if (typeof(categoryName) === "string") {
              console.log("test");
              ads = await Ad.find({
                where:{
                  category:{
                    name: Like(`%${categoryName}%`)
                  }
                },
                relations: {
                  category: true,
                  tags: true
                }
              })
            } else if (typeof(targetId) === "string"){
              const targetIdnum = Number(targetId);
              ads = await Ad.find({
                where:{
                  id: targetIdnum
                },
                relations: {
                  category: true,
                  tags: true
                }
              })
            } else {
              ads = await Ad.find({
                relations: {
                  category: true,
                  tags: true
                }
              })
            }
            res.send(ads);
          } catch (err){
            console.log(err);
            res.status(500).send();
          }
    }
    createOne = async (req: Request, res: Response)=>{
        try {
            const newAd = new Ad();
            const date = new Date;
            const dateString = date.toISOString().split('T')[0];
            const today = new Date(dateString);

            Object.assign(newAd, req.body);
            newAd["createdAt"] = today;
            const errors = await validate(newAd);
            if (errors.length === 0) {
              await newAd.save();
              res.send(newAd);
              console.log("Ad " + newAd.title + " créé avec succès");
            } else {
              console.log(errors);
              res.send(errors);
            }
          } catch (err) {
            console.log(err);
            res.status(500).send();
          }
    }
    deleteOne = async (req: Request, res: Response)=>{
        try{
            const targetAdId: number = Number(req.params.id);
            const targetAd = await Ad.findOneBy({id: targetAdId});
            if (targetAd){
              await targetAd.remove();
              console.log(`Ad ${targetAdId} supprimée`)
            }
            res.send(targetAd);
          } catch (err) {
            console.log(err);
            res.status(500).send();
          }
    }
    patchOne = async (req: Request, res: Response)=>{
        try {
            const targetAdId: number = Number(req.params.id);
            const targetAd = await Ad.findOneBy({id: targetAdId});
            if (targetAd) {
              Object.assign(targetAd, req.body, {id : targetAd.id});
              await targetAd.save();
              res.send(targetAd);
              console.log(`AD ${targetAdId} modifiée`)
            } else {
              console.log(`L'Ad ${targetAdId} n'existe pas`)
            }
          } catch (err) {
            console.log(err);
            res.status(500).send();
          } 
    }
}