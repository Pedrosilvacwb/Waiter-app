import path from "node:path";

import express from "express";
import mongoose from "mongoose";
import { router } from "./router";

mongoose
  .connect("mongodb://localhost:27017/Waiter_app")
  .then(() => {
    console.log("Banco de dados conectado");
    const app = express();
    const port = 3001;

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());
    app.use(router);
    app.listen(port, () => {
      console.log(`Servidor rodando na porta http://localhost:${port}`);
    });
  })
  .catch(() => console.log("Erro ao conectar ao banco de dados"));
