import { ICidade, IPessoa,  } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    cidade: IPessoa;
    pessoa: ICidade;
    usuario: IUsuario;
  }
}
