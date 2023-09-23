import { Controller } from ".";
import { Request, Response } from "express";
import { Ad } from "../entities/Ad";
import { validate } from "class-validator";
import { Like } from "typeorm";

export class AdController extends Controller{
    getAll = async (req: Request, res: Response)=>{
        try {
            let ads;
            const categoryName = req.query.category;
            if (typeof(categoryName) === "string") {
              ads = await Ad.find({
                where:{
                  category:{
                    name: Like(`%${categoryName}%`)
                  }
                },
                relations: {
                  category: true
                }
              })
            } else {
              ads = await Ad.find({
                relations: {
                  category: true
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
            Object.assign(newAd, req.body);
            const errors = await validate(newAd);
            if (errors.length === 0) {
              await newAd.save();
              res.send(newAd);
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