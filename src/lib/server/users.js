import { ObjectId } from 'mongodb';
import { connectToDatabase } from '$lib/server/db';

async function getUsersCollection() {
    const db = await connectToDatabase();
    return db.collection('users');
}

export async function getUserByEmail(email) {
    const collection = await getUsersCollection();

    return collection.findOne({
        email: email.toLowerCase()
    });
}

export async function getUserById(id) {
    const collection = await getUsersCollection();

    return collection.findOne({
        _id: new ObjectId(id)
    });
}

export async function createUser({ name, email, passwordHash }) {
    const collection = await getUsersCollection();

    return collection.insertOne({
        name,
        email: email.toLowerCase(),
        passwordHash,
        createdAt: new Date()
    });
}

export function serializeUser(user) {
    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email
    };
}