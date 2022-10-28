const express = require("express");
const not_found = require("./middleware/not-found");
const error_handler = require("./middleware/error-handler")
require("dotenv").config();
const app = express();

app.use(express.json());

const homeRoute = require("./routes/homeRoute.js");
const productRoute = require("./routes/ProductRoute.js");


app.use("/",homeRoute);

app.use("/api/store",productRoute);



//Page not found at the end.
app.use(error_handler);
app.use(not_found);

//setup dbconnection and start the app
const dbConnection = require("./db/connect");
const port = process.env.PORT || 4000;

dbConnection(process.env.MONGO_URI).then(reponse=>{
    app.listen(port,()=>{console.log("app listening on port " + port)});
}).catch(error=>{
    console.error(error);
    process.end(1);
})

