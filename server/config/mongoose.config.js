const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.LOCAL_DB_URL);
}
