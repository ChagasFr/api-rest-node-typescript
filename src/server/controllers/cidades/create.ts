import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from yup;

interface ICidade {
  nome: string;
}

const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3)
})

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

  try {
    await bodyValidation.validade(req.body)
  } catch (error) {
    
  }

  console.log(req.body.nome);

  return res.send("Creare");
};
