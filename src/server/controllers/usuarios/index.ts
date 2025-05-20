import { signIn } from "./SingIn";
import { signUp } from "./SingUp";

export const UsuariosController = {
  ...signIn,
  ...signUp,
};
