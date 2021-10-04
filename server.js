const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


const db = require("./app/models");
//db.sequelize.sync();

//in development
db.sequelize.sync().then(() => {
    console.log("Gotovo kreiranje tabela!");
});

// parse requests of content-type - application/json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded

require("./app/routes/category.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/score.routes")(app);


const PORT = process.env.PORT || 8080;
module.exports = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});