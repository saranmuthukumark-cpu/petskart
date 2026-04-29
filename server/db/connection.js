// const connectionString = process.env.MONGODB_URI || "";

// const client = new MongoClient(connectionString);

// let conn;

// try {
//   conn = await client.connect();
//   console.log("Connected to MongoDB");
// } catch (e) {
//   console.error(e);
//   console.error("Failed to connect to MongoDB", connectionString);
// }

// let db = conn.db("petskart");

import dns from "node:dns/promises";
import "../utils/loadEnvironment.js";
import mongoose from "mongoose";

dns.setServers(["1.1.1.1"]);

const connectionString = process.env.MONGODB_URI;

try {
  await mongoose.connect(connectionString, {
    dbName: "petskart",
  });
  console.log("MongoDB is connected ,Mongoose ");
} catch (err) {
  console.log(`MongoDb is Not Connected ${err}`);
  process.exit(1);
}
