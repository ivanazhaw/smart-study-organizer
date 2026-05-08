import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { fail } from '@sveltejs/kit';

const allowedExtensionsByType = {
    PDF: ['.pdf'],
    Notizen: ['.txt', '.md'],
    Link: [],
    Präsentation: ['.ppt', '.pptx'],
    Docx: ['.doc', '.docx']
};

export function getAllowedExtensions(type) {
    return allowedExtensionsByType[type] ?? [];
}

export function validateUploadedFile(file, type) {
    if (!file || file.size === 0) return null;

    const allowedExtensions = getAllowedExtensions(type);
    const fileExtension = path.extname(file.name).toLowerCase();

    if (type === 'Link') {
        return fail(400, {
            error: 'Beim Typ Link darf keine Datei hochgeladen werden.'
        });
    }

    if (!allowedExtensions.includes(fileExtension)) {
        return fail(400, {
            error: `Ungültiges Dateiformat. Für "${type}" sind nur folgende Dateien erlaubt: ${allowedExtensions.join(', ')}`
        });
    }

    return null;
}

export async function saveUploadedFile(file, type) {
    const validationError = validateUploadedFile(file, type);

    if (validationError) {
        return validationError;
    }

    if (!file || file.size === 0) {
        return {
            fileName: '',
            filePath: '',
            fileSize: ''
        };
    }

    const uploadDir = path.join(process.cwd(), 'static', 'uploads');

    await mkdir(uploadDir, { recursive: true });

    const fileExtension = path.extname(file.name).toLowerCase();
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