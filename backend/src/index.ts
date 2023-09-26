import "reflect-metadata";
import { dataSource } from "./datasource";
import express from "express";
import { AdController } from "./controllers/Ad";
import { CategoryController } from "./controllers/Category";
import { TagController } from "./controllers/Tag";
const port = 5000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello there");
})

const adController = new AdController();
app.get("/Ad", adController.getAll)
app.post("/Ad", adController.createOne)
app.delete("/Ad/:id", adController.deleteOne)
app.patch("/Ad/:id", adController.patchOne)

const categoryController = new CategoryController();
app.get("/Category", categoryController.getAll)
app.post("/Category", categoryController.createOne)
app.delete("/Category/:id", categoryController.deleteOne)
app.patch("/Category/:id", categoryController.patchOne)

const tagController = new TagController();
app.get("/Tag", tagController.getAll)
app.post("/Tag", tagController.createOne)
app.delete("/Tag/:id", tagController.deleteOne)
app.patch("/Tag/:id", tagController.patchOne)

app.listen(port, async () => {
  await dataSource.initialize();
  console.log('Server launch on http://localhost:5000');
});
