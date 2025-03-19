import express from "express";
import { router } from "./routes";

const server = express();

// dados dentro do body
server.use(express.json());

server.use(router);

interface Test {}

export { server };
