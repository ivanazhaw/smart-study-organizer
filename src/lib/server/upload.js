import path from 'path';
import { randomUUID } from 'crypto';
import cloudinary from './cloudinary.js';

function createSafeFileName(fileName) {
    const extension = path.extname(fileName).toLowerCase();
    const nameWithoutExtension = path.basename(fileName, extension);

    const safeName = nameWithoutExtension
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')
        .toLowerCase();

    return `${safeName}-${randomUUID()}${extension}`;
}

export async function uploadFile(file) {
    if (!file || file.size === 0) {
        return null;
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const safeFileName = createSafeFileName(file.name);

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'raw',
                folder: 'smart-study-organizer',
                public_id: safeFileName,
                use_filename: true,
                unique_filename: false
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(buffer);
    });
}