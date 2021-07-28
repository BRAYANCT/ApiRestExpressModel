const dotenv = require('dotenv').config(),
    Server = require('./models/server'),
    server = new Server();


server.listen();