import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import {
    baseRouter,
    usuariosRouter,
    transferenciaRouter,
} from "../routes/index.js";
dotenv.config();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.basePath = "/";
        this.usuariosPath = "/api/usuarios";
        this.authTransfer = "/api/transfer";
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.basePath, baseRouter);
        this.app.use(this.usuariosPath, usuariosRouter);
        this.app.use(this.authTransfer, transferenciaRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

export { Server };
