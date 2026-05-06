import { redirect, fail } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { connectToDatabase } from '$lib/server/db';

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

        const db = await connectToDatabase();

        await db.collection('materials').insertOne({
            title,
            subject,
            type,
            note,
            fileName,
            filePath,
            fileSize,
            favorite: false,
            date: new Date().toLocaleDateString('de-CH'),
            createdAt: new Date(),
            lastOpened: new Date()
        });

        throw redirect(303, '/');
    }
};