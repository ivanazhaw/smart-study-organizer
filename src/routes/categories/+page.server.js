import { getMaterialsBySubject, serializeMaterials } from '$lib/server/materials';

export async function load() {
    const materials = await getMaterialsBySubject();

    return {
        materials: serializeMaterials(materials)
    };
}