import { redirect, error } from '@sveltejs/kit';

import {
    isValidMaterialId,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
    serializeMaterial
} from '$lib/server/materials';

import { deleteUploadedFile } from '$lib/server/upload';

export async function load({ params, locals }) {
    if (!isValidMaterialId(params.id)) {
        throw error(404, 'Material nicht gefunden');
    }

    await updateMaterial(params.id, locals.user._id, {
        lastOpened: new Date()
    });

    const material = await getMaterialById(params.id, locals.user._id);

    return {
        material: material ? serializeMaterial(material) : null
    };
}

export const actions = {
    toggleFavorite: async ({ params, locals }) => {
        if (!isValidMaterialId(params.id)) {
            throw error(404, 'Material nicht gefunden');
        }

        const material = await getMaterialById(params.id, locals.user._id);

        if (material) {
            await updateMaterial(params.id, locals.user._id, {
                favorite: !material.favorite
            });
        }

        throw redirect(303, `/materials/${params.id}`);
    },

    delete: async ({ params, locals }) => {
        if (!isValidMaterialId(params.id)) {
            throw error(404, 'Material nicht gefunden');
        }

        const material = await getMaterialById(params.id, locals.user._id);

        await deleteUploadedFile(material?.filePath);

        await deleteMaterial(params.id, locals.user._id);

        throw redirect(303, '/');
    }
};