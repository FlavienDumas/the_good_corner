import { DataSource } from "typeorm";
import {Ad} from "./entities/Ad";
import { Category } from "./entities/Category";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "tgc.sqlite",
  entities: [Ad, Category],
  synchronize: true,
  logging: false
});
