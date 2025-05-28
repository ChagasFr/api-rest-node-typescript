import * as signIn from "./usuarios/SingIn";
import * as signUp from "./usuarios/SingUp";

export const UsuariosController = {
  ...signIn,
  ...signUp,
};
