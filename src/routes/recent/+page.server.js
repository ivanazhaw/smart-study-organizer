import { getRecentMaterials, serializeMaterials } from '$lib/server/materials';

export async function load() {
    const materials = await getRecentMaterials();

    return {
        materials: serializeMaterials(materials)
    };
}