import { MongoClient } from 'mongodb';
import { DB_URI } from '$env/static/private';

const client = new MongoClient(DB_URI);

let db;

export async function connectToDatabase() {
    if (!db) {
        await client.connect();

        db = client.db('smart-study-organizer');
    }

    return db;
}