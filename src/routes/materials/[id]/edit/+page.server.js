import { redirect, error, fail } from '@sveltejs/kit';

import {
    isValidMaterialId,
    getMaterialById,
    updateMaterial,
    serializeMaterial
} from '$lib/server/materials';

import { uploadFile } from '$lib/server/upload';

const allowedExtensionsByType = {
    PDF: ['.pdf'],
    Notizen: ['.txt', '.md'],
    Link: [],
    Präsentation: ['.ppt', '.pptx'],
    Docx: ['.doc', '.docx']
};

const MAX_FILE_SIZE = 4 * 1024 * 1024;

function validateFile(file, type) {
    if (!file || file.size === 0) return null;

    if (file.size > MAX_FILE_SIZE) {
        return 'Die Datei ist zu gross. Bitte lade eine Datei unter 4 MB hoch.';
    }

    if (type === 'Link') {
        return 'Beim Typ Link darf keine Datei hochgeladen werden.';
    }

    const allowedExtensions = allowedExtensionsByType[type] ?? [];
    const fileName = file.name.toLowerCase();
    const isAllowed = allowedExtensions.some((extension) => fileName.endsWith(extension));

    if (!isAllowed) {
        return `Ungültiges Dateiformat. Für "${type}" sind nur folgende Dateien erlaubt: ${allowedExtensions.join(', ')}.`;
    }

    return null;
}

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

        const title = formData.get('title')?.toString().trim();
        const subject = formData.get('subject')?.toString().trim();
        const type = formData.get('type')?.toString();
        const note = formData.get('note')?.toString().trim();
        const file = formData.get('file');

        if (!title || !subject || !type) {
            return fail(400, {
                error: 'Bitte fülle alle Pflichtfelder aus.'
            });
        }

        const material = await getMaterialById(params.id, locals.user._id);

        if (!material) {
            throw error(404, 'Material nicht gefunden');
        }

        const fileError = validateFile(file, type);

        if (fileError) {
            return fail(400, {
                error: fileError
            });
        }

        const updateData = {
            title,
            subject,
            type,
            note,
            updatedAt: new Date()
        };

        try {
            if (file && file.size > 0) {
                const uploadedFile = await uploadFile(file);

                updateData.fileName = file.name;
                updateData.filePath = uploadedFile.secure_url;
                updateData.fileSize = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
            }

            await updateMaterial(params.id, locals.user._id, updateData);
        } catch (err) {
            console.error('Fehler beim Bearbeiten des Materials:', err);

            return fail(500, {
                error: 'Das Material konnte nicht gespeichert werden. Bitte versuche es erneut.'
            });
        }

        throw redirect(303, `/materials/${params.id}`);
    }
};