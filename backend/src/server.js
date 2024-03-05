const express = require("express");
var cors = require("cors");

const { router } = require("./routes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(3030, () => console.log("Server is running!"));
