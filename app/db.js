'use server'
// Skrevet av Rolf
import { MongoClient } from "mongodb";

let database;

// Henter mongo klienten og databasen som skal bli brukt i api-ene
export async function getClient() {
    if (!database) {
        const client = new MongoClient(process.env.MONGODB_URI);
        database = client.db("Camping");
        return database;
    } else {
        return database;
    }
}