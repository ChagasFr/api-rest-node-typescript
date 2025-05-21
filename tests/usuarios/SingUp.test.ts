import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Usuario - SingUp", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ nome: "Teste" });

    cidadeId = resCidade.body;
  });

  it("Cadastra usuario 1", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "Juca da Silva",
      email: "jucasilva@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Cadastra registro 2", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "Pedro da Rosa",
      email: "pedrodarosa@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Erro ao cadastrar um usuario com email duplicado", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "Pedro da Rosa",
      email: "pedroduplicado@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const res2 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "Juca da silva",
      email: "pedroduplicado@gmail.com",
    });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });
  it("Erro ao cadastrar um usuario sem email", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "Pedro da Rosa",
      // email: "pedrodarosa@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Erro ao cadastrar um usuario sem nome", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      // nome: "Pedro da Rosa",
      email: "pedrodarosa@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
  it("Erro ao cadastrar um usuario sem senha", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      // senha: "123456",
      nome: "Pedro da Rosa",
      email: "pedrodarosa@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.senha");
  });
  it("Erro ao cadastrar um usuario com email inválido", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "Pedro da Rosa",
      email: "pedrodarosa gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Erro ao cadastrar um usuario com senha muito pequena", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123",
      nome: "Juca da silva",
      email: "jucasilva@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.senha");
  });
  it("Tenta criar registro com cidadeId inválido", async () => {
    const res1 = await testServer.post("/pessoas").send({
      cidadeId: "teste",
      email: "juca@gmail.com",
      nomeCompleto: "Juca da Silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cidadeId");
  });
  it("Tenta criar registro sem enviar nenhuma propriedade", async () => {
    const res1 = await testServer.post("/pessoas").send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
    expect(res1.body).toHaveProperty("errors.body.cidadeId");
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
  });
});
