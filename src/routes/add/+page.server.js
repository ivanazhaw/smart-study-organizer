import { redirect, fail } from '@sveltejs/kit';
import { uploadFile } from '$lib/server/upload';
import { createMaterial } from '$lib/server/materials';

const allowedExtensionsByType = {
    PDF: ['.pdf'],
    Notizen: ['.txt', '.md'],
    Link: [],
    Präsentation: ['.ppt', '.pptx'],
    Docx: ['.doc', '.docx']
};

function validateFile(file, type) {
    if (!file || file.size === 0) {
        return null;
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

export const actions = {
    default: async ({ request, locals }) => {
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

        const fileError = validateFile(file, type);

        if (fileError) {
            return fail(400, {
                error: fileError
            });
        }

        let fileName = '';
        let filePath = '';
        let fileSize = '';

        if (file && file.size > 0) {
            const uploadedFile = await uploadFile(file);

            fileName = file.name;
            filePath = uploadedFile.secure_url;
            fileSize = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
        }

        const now = new Date();

        const formattedDate = now.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        await createMaterial({
            userId: locals.user._id,
            title,
            subject,
            type,
            note,
            fileName,
            filePath,
            fileSize,
            favorite: false,
            date: formattedDate,
            createdAt: now,
            lastOpened: now
        });

        throw redirect(303, '/');
    }
};