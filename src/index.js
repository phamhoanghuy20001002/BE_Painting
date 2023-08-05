import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./router/web";
import bodyParser from "body-parser";
import connection from "./configs/connectDB";
require("dotenv").config();
const PORT = process.env.PORT || 8080
const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//config view engine
configViewEngine(app);
//config parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//test connect db
connection()
//init web routes

//
// Add headers before the routes are defined
// Add headers before the routes are defined


initWebRoutes(app);



app.listen(PORT, () => {
    console.log(">>>JWT backend is running on the port:", PORT)
})
