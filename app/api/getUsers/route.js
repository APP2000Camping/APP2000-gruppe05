// Skrevet av Rolf
import { getClient } from "@/app/db";

const database = await getClient();
const users = database.collection("users");

let userArr = [];

export async function GET() {
    try {
        //const query = { userID: "test1" };
        
        const cursor = users.find();

        userArr = await cursor.toArray();


        console.log(userArr);
    } finally {

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