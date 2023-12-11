var express = require("express");
var cors = require('cors')

var { router } = require("./routes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(3030, () => console.log("Server is running on http://localhost:3030!"));
