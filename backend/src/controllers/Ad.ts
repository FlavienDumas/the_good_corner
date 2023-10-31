import { Controller } from ".";
import { Request, Response } from "express";
import { Ad } from "../entities/Ad";
import { validate } from "class-validator";
import { Like } from "typeorm";

export class AdController extends Controller{
    getAll = async (req: Request, res: Response)=>{
        try {
            let ads;
            const categoryId = req.query.category;
            const adId = req.query.id;
            const adTitle = req.query.title;
            if (typeof(categoryId) === "string") {
              const categoryIdNum = Number(categoryId);
              ads = await Ad.find({
                where:{
                  category:{
                    id: categoryIdNum
                  }
                },
                relations: {
                  category: true,
                  tags: true
                }
              })
            } else if (typeof(adId) === "string"){
              const adIdnum = Number(adId);
              ads = await Ad.find({
                where:{
                  id: adIdnum
                },
                relations: {
                  category: true,
                  tags: true
                }
              })
            } else if (typeof(adTitle) === "string"){
              ads = await Ad.find({
                where:{
                  title: Like(`%${adTitle}%`)
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
              res.status(200).send({state: "Success"});
              console.log("Ad " + newAd.title + " créé avec succès");
            } else {
              console.log(errors);
              res.status(400).send({state: "Failure"});
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
              res.status(200).send({state: "Success"})
            } else {
              res.status(404).send({state: "Failure"})
              console.log(`L'annonce Id : ${targetAdId} n'existe pas!`)
            }
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
              const errors = await validate(targetAd);
              if (errors.length === 0) {
                await targetAd.save();
                res.status(200).send({state: "Success"});
                console.log(`Ad ${targetAdId} modifiée aavec succès`)
              } else {
                res.status(400).send({state: "Failure"});
                console.log(errors);
              }
            } else {
              console.log(`L'Ad ${targetAdId} n'existe pas`)
            }
          } catch (err) {
            console.log(err);
            res.status(500).send();
          } 
    }
}