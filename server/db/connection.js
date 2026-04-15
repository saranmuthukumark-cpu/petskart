import { MongoClient } from "mongodb";

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

const connectionString = process.env.MONGODB_URI || "";

const client = new MongoClient(connectionString);

let conn;

try {
  conn = await client.connect();
  console.log("Connected to MongoDB");
} catch (e) {
  console.error(e);
  console.error("Failed to connect to MongoDB", connectionString);
}

let db = conn.db("petskart");

export default db;
