import { getAllMaterials, serializeMaterials } from '$lib/server/materials';

export async function load({ locals }) {
    if (!locals.user) {
        return {
            user: null,
            materials: []
        };
    }

    const materials = await getAllMaterials(locals.user._id);

    return {
        user: locals.user,
        materials: serializeMaterials(materials)
    };
}