// ACA CREAMOS EL SERVER
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { validateUser } = require("./src/middleware/auth");
// Express Route File Requires
const routes = require("./src/routes");
require("dotenv").config();
const { ENV_PORT } = process.env;

app.use(express.json());
app.use(cookieParser());

// Express Routing
app.use("/", routes);
// app.get("/api/secret", validateUser);

app.listen(ENV_PORT, () => {
  console.log(`Server listening at port ${ENV_PORT}`);
});
