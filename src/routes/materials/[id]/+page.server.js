import { ObjectId } from 'mongodb';
import { redirect, error } from '@sveltejs/kit';
import { unlink } from 'fs/promises';
import path from 'path';
import { connectToDatabase } from '$lib/server/db';

export async function load({ params }) {
    if (!ObjectId.isValid(params.id)) {
        throw error(404, 'Material nicht gefunden');
    }

    const db = await connectToDatabase();
    const materialId = new ObjectId(params.id);

    await db.collection('materials').updateOne(
        { _id: materialId },
        {
            $set: {
                lastOpened: new Date()
            }
        }
    );

    const material = await db.collection('materials').findOne({
        _id: materialId
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
        if (!ObjectId.isValid(params.id)) {
            throw error(404, 'Material nicht gefunden');
        }

        const db = await connectToDatabase();
        const materialId = new ObjectId(params.id);

        const material = await db.collection('materials').findOne({
            _id: materialId
        });

        if (material) {
            await db.collection('materials').updateOne(
                { _id: materialId },
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
        if (!ObjectId.isValid(params.id)) {
            throw error(404, 'Material nicht gefunden');
        }

        const db = await connectToDatabase();
        const materialId = new ObjectId(params.id);

        const material = await db.collection('materials').findOne({
            _id: materialId
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
            _id: materialId
        });

        throw redirect(303, '/');
    }
};