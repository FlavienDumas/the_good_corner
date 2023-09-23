import "reflect-metadata";
import { dataSource } from "./datasource";
import { Ad } from "./entities/Ad";
import express from "express";
import { validate } from "class-validator";
import { Category } from "./entities/Category";
import { Like } from "typeorm";
const port = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello there");
})

// Ad routes
app.get("/Ad", async (req, res) => {
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
})

app.post("/Ad", async (req, res) => {
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
})

app.delete("/Ad/:id", async (req, res) => {
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
})

app.patch("/Ad/:id", async (req, res) =>{
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
})

// Category routes
app.get("/Category", async (req, res) => {
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
})

app.patch("/Category/:id", async (req, res) =>{
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
})

app.listen(port, async () => {
  await dataSource.initialize();
  console.log('Server launch on http://localhost:3000');
});
