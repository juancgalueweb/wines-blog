const express = require("express");
const cors = require("cors");
const app = express();

//Using dotenv
// require("dotenv").config({ path: "./config/.env.dev" });
require("dotenv").config();

//Mongoose config
require("./config/mongoose.config");

//Using cors
app.use(cors());

//Access POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Calling all routes
require("./routes/user.routes")(app);
require("./routes/wine.routes")(app);

//Using the port
const PORT = 8000;
app.listen(PORT, () =>
  console.log(`CORS-enabled web server listening on port ${PORT}`)
);
