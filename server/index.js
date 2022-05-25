// import app from "./server.js";
const app = require("./server");
const mongodb = require("mongodb");
require("dotenv").config();
// import dotenv from "dotenv";
// import usersDAO from "./dao/usersDAO.js";

// dotenv.config();
const MongoClient = mongodb.MongoClient;
const PORT = process.env.PORT || process.argv[2] || 8080;

MongoClient.connect(process.env.MONGODB_URI)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    // await usersDAO.injectDB(client);
    await listDatabases(client);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  });

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
