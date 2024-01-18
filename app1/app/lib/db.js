import { config } from "../config/config.js";
import { MongoClient } from "mongodb";

const client = new MongoClient(config.db.url);

async function getUsers() {
    let result = {};
    try {
      await client.connect();
      const db = client.db(config.db.name);
      const coll = db.collection("user");
      result = await coll.find().toArray();
    } finally {
      await client.close();
    }
    return result;
}

async function registerUser(
    userID,
    password
  ) {
    let result = {};
    let doc = {
      UserID: userID,
      Password: password
    };
    try {
      await client.connect();
      const db = client.db(config.db.name);
      const coll = db.collection("user");
      result = await coll.insertOne(doc);
    } finally {
      await client.close();
    }
    return result;
  }

export { getUsers, registerUser };