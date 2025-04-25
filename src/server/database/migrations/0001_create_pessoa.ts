import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.pessoa, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).index().notNullable();

      table.comment("Tabela poara armazenar as pessoas do sistema.");
    })
    .then(() => {
      console.log(`Tabela criada ${ETableNames.pessoa}`);
    });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pessoa).then(() => {
    console.log(`Tabela derrubada ${ETableNames.pessoa}`);
  });
}
