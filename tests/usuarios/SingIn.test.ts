import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Usuario - SingUp", () => {
  beforeAll(async () => {
    await testServer.post("/cadatrar").send({
      nome: "Jorge",
      senha: "123456",
      email: "Jorge@gmail.com",
    });
  });

  it("Faz login", async () => {
    const res1 = await testServer.post("/entrar").send({
      senha: "123456",
      email: "Jorge@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res1.body).toHaveProperty("acessToken");
  });
  it("Senha errada", async () => {
    const res1 = await testServer.post("/entrar").send({
      senha: "1234567",
      email: "Jorge@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toEqual("errors.default");
  });
  it("email errado", async () => {
    const res1 = await testServer.post("/entrar").send({
      senha: "123456",
      email: "Jorgeeeeeeeee@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });
  it("Formato de email Invalido", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "Pedro da Rosa",
      // email: "pedrodarosa@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("senha muito pequena", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      // nome: "Pedro da Rosa",
      email: "pedrodarosa@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
  it("Nao informado a senha", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      // senha: "123456",
      nome: "Pedro da Rosa",
      email: "pedrodarosa@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.senha");
  });
  it("Nao informado email", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "Pedro da Rosa",
      email: "pedrodarosa gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
});
