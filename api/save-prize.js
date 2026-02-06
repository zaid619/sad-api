import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('apology_app');
    const collection = db.collection('spins');

    // Convert the incoming date string back into a real Date object
    const dataToSave = {
      ...req.body,
      spunAt: new Date(req.body.spunAt) 
    };

    await collection.insertOne(dataToSave);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}