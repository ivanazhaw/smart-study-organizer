import { redirect, fail } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

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

        let fileName = '';
        let filePath = '';
        let fileSize = '';

        if (file && file.size > 0) {
            const uploadDir = path.join(process.cwd(), 'static', 'uploads');

            await mkdir(uploadDir, { recursive: true });

            const fileExtension = path.extname(file.name);
            const savedFileName = `${randomUUID()}${fileExtension}`;
            const savedPath = path.join(uploadDir, savedFileName);

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await writeFile(savedPath, buffer);

            fileName = file.name;
            filePath = `/uploads/${savedFileName}`;
            fileSize = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
        }

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