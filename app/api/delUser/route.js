// Skrevet av Rolf
import { MongoClient } from "mongodb";

// Initialiserer mongodb klienten
const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("userLogin");
const users = database.collection("users");

export async function DELETE(req) {
    try {
        const username = (await req.json()).userID;

        const query = { userID: username };

        const result = await users.deleteOne(query);
        console.log(result.deletedCount);
        console.log(username);
    } finally {
        await client.close();

        return new Response( JSON.stringify({ response: "Deleted document" }), {
            status: 201,
        })
    }
}