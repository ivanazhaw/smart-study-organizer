import { redirect, fail } from '@sveltejs/kit';
import { saveUploadedFile } from '$lib/server/upload';
import { createMaterial } from '$lib/server/materials';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const title = formData.get('title');
        const subject = formData.get('subject');
        const type = formData.get('type');
        const note = formData.get('note');
        const file = formData.get('file');

        if (!title || !subject || !type) {
            return fail(400, {
                error: 'Bitte fülle alle Pflichtfelder aus.'
            });
        }

        const uploadedFile = await saveUploadedFile(file);

        const now = new Date();

        const formattedDate = now.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        await createMaterial({
            title,
            subject,
            type,
            note,
            fileName: uploadedFile.fileName,
            filePath: uploadedFile.filePath,
            fileSize: uploadedFile.fileSize,
            favorite: false,
            date: formattedDate,
            createdAt: now,
            lastOpened: now
        });

        throw redirect(303, '/');
    }
};