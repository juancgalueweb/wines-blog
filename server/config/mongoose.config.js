const mongoose = require("mongoose");
// Esta ruta funciona
// const LOCAL_DB_URL = "mongodb://localhost/wine_blog_db";

// Ruta para el contenedor de docker
const LOCAL_DB_URL = "mongodb://mongo/wine_blog_db";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`${LOCAL_DB_URL}`);
}
