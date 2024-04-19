// Skrevet av Rolf
import { getClient } from "@/app/[locale]/db";

const database = await getClient();
const users = database.collection("users");

export async function DELETE(req) {
    try {
        const username = (await req.json()).userID;

        const query = { userID: username };

        const result = await users.deleteOne(query);
        console.log(result.deletedCount);
        console.log(username);
    } finally {

        return new Response( JSON.stringify({ response: "Deleted document" }), {
            status: 201,
        })
    }
}