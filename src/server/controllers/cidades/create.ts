import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ICidade {
  nome: string;
}
interface IFilter {
  filter: string;
}
export const createBodyValidator = validation({
  body: yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2),
  }),

  query: yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2),
  }),
});

export const create: RequestHandler = async (
  req: Request<{}, {}, ICidade>,
  res: Response
) => {
  console.log(req.body.nome);

  return res.send("Creare");
};
