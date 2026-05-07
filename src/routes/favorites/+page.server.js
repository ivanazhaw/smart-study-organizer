import { connectToDatabase } from '$lib/server/db';
import { ObjectId } from 'mongodb';

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

export const actions = {
    toggleFavorite: async ({ request }) => {
        const db = await connectToDatabase();

        const formData = await request.formData();

        const id = formData.get('id');
        const favorite = formData.get('favorite') === 'true';

        await db.collection('materials').updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: {
                    favorite
                }
            }
        );

        return {
            success: true
        };
    }
};