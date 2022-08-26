const mongoose = require("mongoose");
// Esto lo usaba antes de implementar dot_env
// const LOCAL_DB_URL = "mongodb://localhost/wine_blog_db";

// Ruta para el contenedor de docker
const DB_URL = process.env.MONGO_URI;
// console.log("DB_URL: ", DB_URL);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(DB_URL);
}
