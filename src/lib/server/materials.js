import { ObjectId } from 'mongodb';
import { connectToDatabase } from '$lib/server/db';

async function getMaterialsCollection() {
    const db = await connectToDatabase();
    return db.collection('materials');
}

export async function getAllMaterials() {
    const collection = await getMaterialsCollection();

    return collection.find().sort({ createdAt: -1 }).toArray();
}

export async function getFavoriteMaterials() {
    const collection = await getMaterialsCollection();

    return collection.find({ favorite: true }).sort({ createdAt: -1 }).toArray();
}

export async function getRecentMaterials() {
    const collection = await getMaterialsCollection();

    return collection.find().sort({ lastOpened: -1 }).toArray();
}

export async function getMaterialsBySubject() {
    const collection = await getMaterialsCollection();

    return collection.find().sort({ subject: 1, createdAt: -1 }).toArray();
}

export async function getMaterialById(id) {
    const collection = await getMaterialsCollection();

    return collection.findOne({
        _id: new ObjectId(id)
    });
}

export async function updateMaterial(id, data) {
    const collection = await getMaterialsCollection();

    return collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
}

export async function deleteMaterial(id) {
    const collection = await getMaterialsCollection();

    return collection.deleteOne({
        _id: new ObjectId(id)
    });
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

export async function createMaterial(data) {
    const collection = await getMaterialsCollection();

    return collection.insertOne(data);
}