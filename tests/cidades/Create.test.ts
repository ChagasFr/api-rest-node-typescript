import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
  it("Cria registro", () => {
    testServer.post("/cidades").send({ nome: "Caxias do Sul" });
  });
});
