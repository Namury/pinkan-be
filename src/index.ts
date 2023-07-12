import "./paths";
import express from "express";
import "dotenv/config";
import routes from "./routes";
import cors from "cors";

import { dateActivePrograms } from "$utils/worker.utils";

const app = express();
const PORT: number = Number(process.env.PORT) || 3010;

const allowedOrigins = [
  "http://localhost:" + String(PORT),
  "http://localhost:" + String(PORT) + "/",
  "http://localhost:3000",
  "http://localhost:3000/",
  "http://localhost:3001",
  "http://localhost:3001/",
  "https://pinkan-fe.vercel.app/",
  "https://pinkan-fe.vercel.app",
  "https://api.pinkan.com/",
  "https://api.pinkan.com",
  "https://pinkan.com/",
  "https://pinkan.com",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(options));
dateActivePrograms().start();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  routes(app);
});
