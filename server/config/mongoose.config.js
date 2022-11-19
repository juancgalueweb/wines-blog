const mongoose = require("mongoose");

// Ruta para el contenedor de docker
const DB_URL = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(DB_URL);
}
