const express = require('express'),
    //dotenv = require('dotenv').config(),
    cors = require('cors'),
    userRouters = require('../routes/user.router'),
    { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        //conectar a la base de datos
        this.connectDB();
        //middelwares
        this.middelwares();
        //rutas de mi aplicacion
        this.routes();
    }
    async connectDB() {
        await dbConnection();
    }
    middelwares() {
        //cors
        this.app.use(cors());
        //Parseo y lectura de body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.usersPath, userRouters);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el ' + this.port);
        });
    }
}
module.exports = Server;