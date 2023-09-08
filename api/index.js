// ACA CREAMOS EL SERVER
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { validateUser } = require("./src/middleware/auth");
const db = require("./src/db/db");
const cors = require("cors");
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  // Agrega otras opciones de configuración si es necesario.
};
app.use(cors(corsOptions));
// Express Route File Requires
const routes = require("./src/routes");
require("dotenv").config();
const { ENV_PORT } = process.env;

app.use(express.json());
app.use(cookieParser());

// Express Routing
app.use("/", routes);
// app.get("/api/secret", validateUser);

db.sync({ alter: true }).then(() => {
  app.listen(ENV_PORT, () => {
    console.log(`Server listening at port ${ENV_PORT}`);
  });
});
