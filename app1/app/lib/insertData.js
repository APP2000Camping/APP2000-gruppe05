// pages/api/insertData.js

import { connectDatabase } from '../../mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { UserID, Password } = req.body;

  if (!UserID || !Password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const mongodb = await connectDatabase();
  const collection = mongodb.collection('user');

  try {
    const result = await collection.insertOne({ UserID, Password });
    
    return res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
