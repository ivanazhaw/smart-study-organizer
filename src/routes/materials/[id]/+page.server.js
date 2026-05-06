import { ObjectId } from 'mongodb';
import { connectToDatabase } from '$lib/server/db';

export async function load({ params }) {
    const db = await connectToDatabase();

    const material = await db.collection('materials').findOne({
        _id: new ObjectId(params.id)
    });

    return {
        material: material
            ? {
                ...material,
                _id: material._id.toString()
            }
            : null
    };
}