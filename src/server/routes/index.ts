import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CidadesController } from "../controllers/cidades/index";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Ola, dev! ");
});

router.post(
  "/cidades",
  CidadesController.createBodyValidator,
  CidadesController.createQueryValidator,
  CidadesController.create
);

export { router };
