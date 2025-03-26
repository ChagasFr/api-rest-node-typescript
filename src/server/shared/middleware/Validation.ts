import { RequestHandler } from "express";

type TValidation = () => RequestHandler;

export const validation = () => async (req, res, next) => {
  console.log("test");
};
