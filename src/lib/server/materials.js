import { ObjectId } from 'mongodb';
import { connectToDatabase } from '$lib/server/db';

async function getMaterialsCollection() {
    const db = await connectToDatabase();
    return db.collection('materials');
}

export async function getAllMaterials(userId) {
    const collection = await getMaterialsCollection();

    return collection.find({ userId }).sort({ createdAt: -1 }).toArray();
}

export async function getFavoriteMaterials(userId) {
    const collection = await getMaterialsCollection();

    return collection.find({ userId, favorite: true }).sort({ createdAt: -1 }).toArray();
}

export async function getRecentMaterials(userId) {
    const collection = await getMaterialsCollection();

    return collection.find({ userId }).sort({ lastOpened: -1 }).toArray();
}

export async function getMaterialsBySubject(userId) {
    const collection = await getMaterialsCollection();

    return collection.find({ userId }).sort({ subject: 1, createdAt: -1 }).toArray();
}

export async function getMaterialById(id, userId) {
    const collection = await getMaterialsCollection();

    return collection.findOne({
        _id: new ObjectId(id),
        userId
    });
}

export async function updateMaterial(id, userId, data) {
    const collection = await getMaterialsCollection();

    return collection.updateOne(
        {
            _id: new ObjectId(id),
            userId
        },
        {
            $set: data
        }
    );
}

export async function deleteMaterial(id, userId) {
    const collection = await getMaterialsCollection();

    return collection.deleteOne({
        _id: new ObjectId(id),
        userId
    });
}

export async function createMaterial(data) {
    const collection = await getMaterialsCollection();

    return collection.insertOne(data);
}

export function serializeMaterial(material) {
    return {
        ...material,
        _id: material._id.toString()
    };
}

export function serializeMaterials(materials) {
    return materials.map(serializeMaterial);
}

export function isValidMaterialId(id) {
    return ObjectId.isValid(id);
}