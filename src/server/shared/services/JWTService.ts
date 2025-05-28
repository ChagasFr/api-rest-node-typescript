import * as jwt from "jsonwebtoken";

interface IJwtData {
  uid: number;
}

const sign = (data: IJwtData) => {
  return jwt.sign(data, "23711982437198372");
};

const verify = () => {};

export const JWTService = {
  sign,
  verify,
};
