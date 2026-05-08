import { getRecentMaterials, serializeMaterials } from '$lib/server/materials';

export async function load({ locals }) {
    const materials = await getRecentMaterials(locals.user._id);

    return {
        materials: serializeMaterials(materials)
    };
}