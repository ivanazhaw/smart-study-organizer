import { getAllMaterials, serializeMaterials } from '$lib/server/materials';

export async function load() {
    const materials = await getAllMaterials();

    return {
        materials: serializeMaterials(materials)
    };
}