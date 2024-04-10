'use server'

// Skrevet av Rolf
import { MongoClient } from "mongodb";

let database;

export async function getClient() {
    if (!database) {
        const client = new MongoClient(process.env.MONGODB_URI);
        database = client.db("Camping");
        return database;
    } else {
        return database;
    }
}