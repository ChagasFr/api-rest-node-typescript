import express from "express";
import "dotenv/config";

import { router } from "./routes";

const server = express();

// dados dentro do body
server.use(express.json());

server.use(router);

interface Test {}

export { server };
