import { ETableNames } from "../../ETableNames";
import { ICidade } from "../../models";
import { Knex } from "../../knex";

export const getAll = async (
  page: number,
  limit: number,
  filter: string
): Promise<ICidade[] | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select("*")
      .where("nome completo", "like", `%${filter}%`)
      .orWhere("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registros");
  }
};
