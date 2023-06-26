import { response_not_found } from "$utils/response.utils";
import { Express, Request, Response } from "express";
import userRoutes from "./userRoutes";
import salesZoneRoutes from "./salesZoneRoutes";
import consumerRoutes from "./consumerRoutes";


export default function routes(app: Express) {
  app.use("/user", userRoutes);
  app.use("/sales-zone", salesZoneRoutes);
  app.use("/consumer", consumerRoutes);
  app.all("*", (req: Request, res: Response) => {
    return response_not_found(res);
  });
}
