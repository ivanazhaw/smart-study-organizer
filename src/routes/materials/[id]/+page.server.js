import { redirect, error } from '@sveltejs/kit';
import { unlink } from 'fs/promises';
import path from 'path';

import {
    isValidMaterialId,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
    serializeMaterial
} from '$lib/server/materials';

export async function load({ params }) {
    if (!isValidMaterialId(params.id)) {
        throw error(404, 'Material nicht gefunden');
    }

    await updateMaterial(params.id, {
        lastOpened: new Date()
    });

    const material = await getMaterialById(params.id);

    return {
        material: material ? serializeMaterial(material) : null
    };
}

export const actions = {
    toggleFavorite: async ({ params }) => {
        if (!isValidMaterialId(params.id)) {
            throw error(404, 'Material nicht gefunden');
        }

        const material = await getMaterialById(params.id);

        if (material) {
            await updateMaterial(params.id, {
                favorite: !material.favorite
            });
        }

        throw redirect(303, `/materials/${params.id}`);
    },

    delete: async ({ params }) => {
        if (!isValidMaterialId(params.id)) {
            throw error(404, 'Material nicht gefunden');
        }

        const material = await getMaterialById(params.id);

        if (material?.filePath) {
            const filePath = path.join(process.cwd(), 'static', material.filePath);

            try {
                await unlink(filePath);
            } catch {
                console.log('Datei konnte nicht gelöscht werden oder existiert nicht mehr.');
            }
        }

        await deleteMaterial(params.id);

        throw redirect(303, '/');
    }
};