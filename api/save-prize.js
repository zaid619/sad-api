import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  // LOG 1: Check if the function is even starting
  console.log("API Triggered: save-prize");

  if (req.method !== 'POST') {
    console.error("Invalid method:", req.method);
    return res.status(405).send('Method Not Allowed');
  }

  // LOG 2: Check if Environment Variable is present (don't log the actual password!)
  if (!process.env.MONGODB_URI) {
    console.error("ERROR: MONGODB_URI is missing in Vercel Settings");
    return res.status(500).json({ error: "Database connection string missing" });
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("Connected successfully to Atlas");

    const db = client.db('apology_app');
    const collection = db.collection('spins');

    const dataToSave = {
      ...req.body,
      spunAt: new Date(req.body.spunAt) 
    };

    // LOG 3: See exactly what we are trying to save
    console.log("Data to save:", dataToSave);

    await collection.insertOne(dataToSave);
    console.log("Insert successful!");

    return res.status(200).json({ success: true });
  } catch (error) {
    // LOG 4: Log the full error message
    console.error("DATABASE ERROR:", error.message);
    return res.status(500).json({ error: error.message });
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}