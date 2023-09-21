import express from "express";
const app = express();
const port = 3000;

import sqlite from "sqlite3";
const db = new sqlite.Database('good_corner.sqlite', (err) => {
  if (err) {
    console.log(`probleme conneection bd : ${err}`);
  } else {
    console.log("connection effectuée");
  }
});
db.get("PRAGMA foreign_keys = ON;");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello there");
})

// Ad routes
app.get("/Ad", (req, res) => {
    db.all("SELECT Ad.*, Category.name FROM Ad JOIN Category ON Category.id = Ad.category;", (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Erreur de base de données");
      }
      res.send(rows);
    })
})

app.post("/Ad", (req, res) => {
  db.run("INSERT INTO Ad (title, description, owner, price, location, createdAt, category) VALUES ($title, $description, $owner, $price, $location, $createdAt, $category)",
  {
    $title: req.body.title,
    $description: req.body.description,
    $owner: req.body.owner,
    $price: req.body.price,
    $location: req.body.location,
    $createdAt: req.body.createdAt,
    $category: req.body.category
  },
  (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur de base de données");
    } else {
      res.status(204).send();
    }
  });
})

app.delete("/Ad/:id", (req, res) =>{
  const targetId: number = Number(req.params.id);
  db.run("DELETE FROM Ad WHERE id = $id",
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
  });
})

app.patch("/Ad/:id", (req, res) =>{
  const targetId = Number(req.params.id);
  const newAd = req.body;
  let query = "UPDATE Ad SET ";
  let fields: { [key: string]: string | number } = {};
  let setting = "";

  if ('title' in newAd){
    setting += "title= $title, ";
    fields["$title"] = req.body.title;
  }
  if ('description' in newAd){
    setting += "description= $description, ";
    fields["$description"] = req.body.description;
  }
  if ('owner' in newAd){
    setting += "owner= $owner, ";
    fields["$owner"] = req.body.owner;
  }
  if ('price' in newAd){
    setting += "price= $price, ";
    fields["$price"] = req.body.price;
  }
  if ('location' in newAd){
    setting += "location= $location, ";
    fields["$location"] = req.body.location;
  }
  if ('createdAt' in newAd){
    setting += "createdAt= $createdAt, ";
    fields["$createAt"] = req.body.createdAt;
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
})

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
})

app.listen(port, () => {
  console.log(`l'app écoute sur le port ${port}`);
})