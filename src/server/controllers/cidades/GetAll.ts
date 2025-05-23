import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
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
      page: yup
        .number()
        .notRequired()
        .moreThan(0)
        .nullable(false) as yup.NumberSchema<number | undefined>,
      limit: yup
        .number()
        .notRequired()
        .moreThan(0)
        .nullable(false) as yup.NumberSchema<number | undefined>,
      filter: yup.string().notRequired().nullable(false) as yup.StringSchema<
        string | undefined
      >,
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", 1);

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: "Caxias do Sul",
    },
  ]);
};
