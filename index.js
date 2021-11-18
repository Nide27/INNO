const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const port = 3031;
const config = require("./config");

const usersRouter = require("./routes/users");
const {NULL_EXPR} = require("@angular/compiler/src/output/output_ast");

app.use(morgan("dev"));

const dbUrl = config.dbUrl;

let options = {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
    if (err) console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", usersRouter);

app.listen(port, function () {
    console.log("Running on " + port);
});
module.exports = app;