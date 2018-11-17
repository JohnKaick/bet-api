import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

const app = express();
const serverDir = path.resolve(__dirname, 'server');

// Porta
let port = process.env.NODE_ENV === 'development' 
            ? process.env.PORT || '8000'
            : process.env.PORT || '3000';

// import todas as models db
fs.readdirSync(serverDir).forEach((diretorios) => {
    let modelsDir = path.resolve(serverDir, diretorios, 'model.js');
    require(modelsDir)(mongoose, mongoose.Schema.Types)
})

// Conexão com DB
const uri = process.env.MONGO_URI || 'mongodb://localhost/bet';
mongoose.promiseLibrary = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect(uri, { useNewUrlParser: true });

// Config. do express
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import das routes
fs.readdirSync(serverDir).forEach((diretorios) => {
    let controllersDir = path.resolve(serverDir, diretorios, 'controller.js');
    let route = require(controllersDir)
    app.use(`/api/${diretorios}`, route)
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
