import { DataSource } from "typeorm";
import {Ad} from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: false
});
