import "reflect-metadata";
import { dataSource } from "./datasource";
import { Ad } from "./entities/Ad";
import express from "express";
const port = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello there");
})

// Ad routes
app.get("/Ad", async (req, res) => {
    try {
      const ads = await Ad.find()
      res.send(ads);
    } catch (err){
      console.log(err);
      res.status(500).send();
    }
})


app.post("/Ad", async (req, res) => {
  try {
    const newAd = new Ad();
    const liste = ["title", "description", "owner", "price", "picture", "location", "createdAt", "category"];
    for (const key of liste) {
      if (req.body.hasOwnProperty(key)) {
        switch (key) {
          case "title":
              newAd.title = req.body[key]; break;
          case "description":
              newAd.description = req.body[key]; break;
          case "owner":
              newAd.owner = req.body[key]; break;
          case "price":
              newAd.price = req.body[key]; break;
          case "picture":
              newAd.picture = req.body[key]; break;
          case "location":
              newAd.location = req.body[key]; break;
          case "createdAt":
              newAd.createdAt = req.body[key]; break;
          case "category":
              newAd.category = req.body[key]; break;
          default:
              break;
        }}}

    if (newAd.title === undefined || newAd.owner === undefined) {
      console.log('enregistrement impossible : renseigner les champs "title" et "owner"')
    } else {
      await newAd.save();
      res.send(newAd);
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
    if (targetAd !== null){
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
    if (targetAd !== null) {
      const liste = ["title", "description", "owner", "price", "picture", "location", "createdAt", "category"];
      for (const key of liste) {
        if (req.body.hasOwnProperty(key)) {
          switch (key) {
            case "title":
              targetAd.title = req.body[key]; break;
            case "description":
              targetAd.description = req.body[key]; break;
            case "owner":
              targetAd.owner = req.body[key]; break;
            case "price":
              targetAd.price = req.body[key]; break;
            case "picture":
              targetAd.picture = req.body[key]; break;
            case "location":
              targetAd.location = req.body[key]; break;
            case "createdAt":
              targetAd.createdAt = req.body[key]; break;
            case "category":
              targetAd.category = req.body[key]; break;
            default:
                break;
          }}}
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

/*
// Category routes
app.get("/Category", (req, res) =>{
  db.all("SELECT * FROM category;", (err, rows) =>{
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur de base de données");
    }
    res.send(rows);
  })
})

app.post("/Category", (req, res) => {
  db.run("INSERT INTO Category (name) VALUES ($name);",
  {
    $name: req.body.name
  },
  (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur de base de données");
    } else {
      res.status(204).send();
    }
  })
})

app.delete("/Category/:id", (req, res) =>{
  const targetId: number = Number(req.params.id);
  db.run("DELETE FROM Category WHERE id = $id",
  {
    $id: targetId
  },
  (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur de base de données");
    } else {
      res.status(204).send();
    }
  })
})

app.patch("/Category/:id", (req, res) =>{
  const targetId = Number(req.params.id);
  const newCateg = req.body;
  let query = "UPDATE Category SET ";
  let fields: { [key: string]: string | number } = {};
  let setting = "";

  if ('name' in newCateg){
    setting += "name= $name, ";
    fields["$name"] = req.body.name;
  }
  setting = setting.slice(0, -2);
  query += setting;
  query += ` WHERE id= ${targetId}`;

  db.run(query, fields,
  (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur de base de données");
    } else {
      res.status(204).send();
    }
  });
})*/

app.listen(port, async () => {
  await dataSource.initialize();
  console.log('Server launch on http://localhost:3000');
});
