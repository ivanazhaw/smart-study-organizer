import { redirect, error } from '@sveltejs/kit';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

import {
    isValidMaterialId,
    getMaterialById,
    updateMaterial,
    serializeMaterial
} from '$lib/server/materials';

export async function load({ params }) {
    if (!isValidMaterialId(params.id)) {
        throw error(404, 'Material nicht gefunden');
    }

    const material = await getMaterialById(params.id);

    if (!material) {
        throw error(404, 'Material nicht gefunden');
    }

    return {
        material: serializeMaterial(material)
    };
}

export const actions = {
    update: async ({ request, params }) => {
        if (!isValidMaterialId(params.id)) {
            throw error(404, 'Material nicht gefunden');
        }

        const formData = await request.formData();

        const title = formData.get('title');
        const subject = formData.get('subject');
        const type = formData.get('type');
        const note = formData.get('note');
        const file = formData.get('file');

        const material = await getMaterialById(params.id);

        const updateData = {
            title,
            subject,
            type,
            note,
            updatedAt: new Date()
        };

        if (file && file.size > 0) {
            if (material?.filePath) {
                const oldFilePath = path.join(process.cwd(), 'static', material.filePath);

                try {
                    await unlink(oldFilePath);
                } catch {
                    console.log('Alte Datei konnte nicht gelöscht werden.');
                }
            }

            const uploadDir = path.join(process.cwd(), 'static', 'uploads');

            await mkdir(uploadDir, { recursive: true });

            const fileExtension = path.extname(file.name);
            const savedFileName = `${randomUUID()}${fileExtension}`;
            const savedPath = path.join(uploadDir, savedFileName);

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await writeFile(savedPath, buffer);

            updateData.fileName = file.name;
            updateData.filePath = `/uploads/${savedFileName}`;
            updateData.fileSize = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
        }

        await updateMaterial(params.id, updateData);

        throw redirect(303, `/materials/${params.id}`);
    }
};