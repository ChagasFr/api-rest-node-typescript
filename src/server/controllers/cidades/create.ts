import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICidade {
  nome: string;
}

const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async () => {
  try {
    await bodyValidation.validate(req.body);
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;

      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};

export const create: RequestHandler = async (
  req: Request<{}, {}, ICidade>,
  res: Response
) => {
  let validateData: ICidade | undefined = undefined;

  console.log(req.body.nome);

  return res.send("Creare");
};
