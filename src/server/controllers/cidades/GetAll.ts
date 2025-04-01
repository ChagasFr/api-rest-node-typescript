import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().notRequired().moreThan(0),
      limit: yup.number().notRequired().moreThan(0),
      filter: yup.string().notRequired(),
    })
  ),
}));

export const getAll: RequestHandler = async (
  _req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  return res.send("Create");
};
