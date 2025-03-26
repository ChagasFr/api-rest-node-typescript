import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ICidade {
  nome: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
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

interface IFilter {
  filter: string;
}

const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const createQueryValidator: RequestHandler = async (req, res, next) => {
  try {
    await queryValidation.validate(req.body);
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

export const createValidation = validation();

export const create: RequestHandler = async (
  req: Request<{}, {}, ICidade>,
  res: Response
) => {
  console.log(req.body.nome);

  return res.send("Creare");
};
