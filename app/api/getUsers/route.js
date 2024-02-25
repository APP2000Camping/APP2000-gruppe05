// Skrevet av Rolf
import { MongoClient } from "mongodb";

// Initialiserer mongodb klienten
const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("userLogin");
const users = database.collection("users");

let userArr = [];

export async function GET() {
    try {
        //const query = { userID: "test1" };
        
        const cursor = users.find();

        userArr = await cursor.toArray();


        console.log(userArr);
    } finally {
        await client.close();

        if (userArr.length === 0) {
            return new Response( JSON.stringify({ response: "No user found" }), {
                status: 400,
            });
        } else {
            return new Response( JSON.stringify({ response: userArr }), {
                status: 201,
            });
        }
    }
};