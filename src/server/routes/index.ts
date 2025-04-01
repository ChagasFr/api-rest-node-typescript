import { Router } from "express";
import { CidadesController } from "../controllers/cidades/index";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Ola, dev! ");
});

router.get(
  "/cidades",
  CidadesController.getAllValidation,
  CidadesController.getAll
);

router.post(
  "/cidades",
  CidadesController.createBodyValidator,
  CidadesController.create
);

export { router };
