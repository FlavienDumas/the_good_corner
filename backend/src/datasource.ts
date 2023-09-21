import { DataSource } from "typeorm";
import {Ad} from "./entities/Ad";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "tgc.sqlite",
  entities: [Ad],
  synchronize: true,
});
