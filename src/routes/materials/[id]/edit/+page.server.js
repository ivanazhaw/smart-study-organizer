import { ObjectId } from 'mongodb';
import { redirect, error } from '@sveltejs/kit';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { connectToDatabase } from '$lib/server/db';

export async function load({ params }) {
    const db = await connectToDatabase();

    const material = await db.collection('materials').findOne({
        _id: new ObjectId(params.id)
    });

    if (!material) {
        throw error(404, 'Material nicht gefunden');
    }

    return {
        material: {
            ...material,
            _id: material._id.toString()
        }
    };
}

export const actions = {
    update: async ({ request, params }) => {
        const db = await connectToDatabase();
        const formData = await request.formData();

        const title = formData.get('title');
        const subject = formData.get('subject');
        const type = formData.get('type');
        const note = formData.get('note');
        const file = formData.get('file');

        const material = await db.collection('materials').findOne({
            _id: new ObjectId(params.id)
        });

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

        await db.collection('materials').updateOne(
            {
                _id: new ObjectId(params.id)
            },
            {
                $set: updateData
            }
        );

        throw redirect(303, `/materials/${params.id}`);
    }
};