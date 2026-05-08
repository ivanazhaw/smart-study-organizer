import { getMaterialsBySubject, serializeMaterials } from '$lib/server/materials';

export async function load({ locals }) {
    const materials = await getMaterialsBySubject(locals.user._id);

    return {
        materials: serializeMaterials(materials)
    };
}