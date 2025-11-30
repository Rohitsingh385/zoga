import { MongoClient, Db } from "mongodb";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("Please define the MONGO_URL environment variable");
}

interface MongoConnection {
  client: MongoClient;
  db: Db;
}

interface GlobalWithMongo {
  _mongoClientPromise?: Promise<MongoConnection>;
}

const globalWithMongo = global as GlobalWithMongo;

let cached = globalWithMongo._mongoClientPromise;

async function connectToDatabase(): Promise<MongoConnection> {
  if (cached) {
    return cached;
  }

  const client = new MongoClient(MONGO_URL as string);

  cached = client.connect().then((client) => {
    return {
      client,
      db: client.db("zoga"),
    };
  });

  globalWithMongo._mongoClientPromise = cached;

  return cached;
}

export default connectToDatabase;

