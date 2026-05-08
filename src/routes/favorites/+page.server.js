import { getFavoriteMaterials, serializeMaterials, updateMaterial } from '$lib/server/materials';

export async function load({ locals }) {
    const materials = await getFavoriteMaterials(locals.user._id);

    return {
        materials: serializeMaterials(materials)
    };
}

export const actions = {
    toggleFavorite: async ({ request, locals }) => {
        const formData = await request.formData();

        const id = formData.get('id');
        const favorite = formData.get('favorite') === 'true';

        await updateMaterial(id, locals.user._id, {
            favorite
        });

        return {
            success: true
        };
    }
};