import { redirect, error } from '@sveltejs/kit';

import {
    isValidMaterialId,
    getMaterialById,
    updateMaterial,
    serializeMaterial
} from '$lib/server/materials';

import { saveUploadedFile, deleteUploadedFile } from '$lib/server/upload';

export async function load({ params, locals }) {
    if (!isValidMaterialId(params.id)) {
        throw error(404, 'Material nicht gefunden');
    }

    const material = await getMaterialById(params.id, locals.user._id);

    if (!material) {
        throw error(404, 'Material nicht gefunden');
    }

    return {
        material: serializeMaterial(material)
    };
}

export const actions = {
    update: async ({ request, params, locals }) => {
        if (!isValidMaterialId(params.id)) {
            throw error(404, 'Material nicht gefunden');
        }

        const formData = await request.formData();

        const title = formData.get('title');
        const subject = formData.get('subject');
        const type = formData.get('type');
        const note = formData.get('note');
        const file = formData.get('file');

        const material = await getMaterialById(params.id, locals.user._id);

        if (!material) {
            throw error(404, 'Material nicht gefunden');
        }

        const updateData = {
            title,
            subject,
            type,
            note,
            updatedAt: new Date()
        };

        if (file && file.size > 0) {
            await deleteUploadedFile(material.filePath);

            const uploadedFile = await saveUploadedFile(file, type);

            if (uploadedFile?.status === 400) {
                return uploadedFile;
            }

            updateData.fileName = uploadedFile.fileName;
            updateData.filePath = uploadedFile.filePath;
            updateData.fileSize = uploadedFile.fileSize;
        }

        await updateMaterial(params.id, locals.user._id, updateData);

        throw redirect(303, `/materials/${params.id}`);
    }
};