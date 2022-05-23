import { CreatePopsicleController } from "@infra/products/useCases/createPopsicle/create.popsicle.controller";
import { Router } from "express";

const productsRoutes = Router();

const createPopsicleController = new CreatePopsicleController();

productsRoutes.post("/popsicle", createPopsicleController.handle);

export { productsRoutes };
