import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';
import { unlink } from 'fs/promises';
import path from 'path';
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

export const actions = {
    toggleFavorite: async ({ params }) => {
        const db = await connectToDatabase();

        const material = await db.collection('materials').findOne({
            _id: new ObjectId(params.id)
        });

        if (material) {
            await db.collection('materials').updateOne(
                { _id: new ObjectId(params.id) },
                {
                    $set: {
                        favorite: !material.favorite
                    }
                }
            );
        }

        throw redirect(303, `/materials/${params.id}`);
    },

    delete: async ({ params }) => {
        const db = await connectToDatabase();

        const material = await db.collection('materials').findOne({
            _id: new ObjectId(params.id)
        });

        if (material?.filePath) {
            const filePath = path.join(process.cwd(), 'static', material.filePath);

            try {
                await unlink(filePath);
            } catch {
                console.log('Datei konnte nicht gelöscht werden oder existiert nicht mehr.');
            }
        }

        await db.collection('materials').deleteOne({
            _id: new ObjectId(params.id)
        });

        throw redirect(303, '/');
    }
};