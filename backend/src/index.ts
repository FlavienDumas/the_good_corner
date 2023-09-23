import "reflect-metadata";
import { dataSource } from "./datasource";
import express from "express";
import { AdController } from "./controllers/Ad";
import { CategoryController } from "./controllers/Category";
const port = 3000;
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
app.patch("/Category/:id", categoryController.patchOne)

app.listen(port, async () => {
  await dataSource.initialize();
  console.log('Server launch on http://localhost:3000');
});
