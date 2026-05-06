import { connectToDatabase } from '$lib/server/db';

export async function load() {
    const db = await connectToDatabase();

    const materials = await db
        .collection('materials')
        .find({ favorite: true })
        .sort({ createdAt: -1 })
        .toArray();

    return {
        materials: materials.map((material) => ({
            ...material,
            _id: material._id.toString()
        }))
    };
}