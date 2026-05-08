import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export async function saveUploadedFile(file) {
    if (!file || file.size === 0) {
        return {
            fileName: '',
            filePath: '',
            fileSize: ''
        };
    }

    const uploadDir = path.join(process.cwd(), 'static', 'uploads');

    await mkdir(uploadDir, { recursive: true });

    const fileExtension = path.extname(file.name);
    const savedFileName = `${randomUUID()}${fileExtension}`;
    const savedPath = path.join(uploadDir, savedFileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await writeFile(savedPath, buffer);

    return {
        fileName: file.name,
        filePath: `/uploads/${savedFileName}`,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`
    };
}

export async function deleteUploadedFile(filePath) {
    if (!filePath) return;

    const fullPath = path.join(process.cwd(), 'static', filePath);

    try {
        await unlink(fullPath);
    } catch {
        console.log('Datei konnte nicht gelöscht werden oder existiert nicht mehr.');
    }
}