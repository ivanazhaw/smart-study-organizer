import { getFavoriteMaterials, serializeMaterials, updateMaterial } from '$lib/server/materials';

export async function load() {
    const materials = await getFavoriteMaterials();

    return {
        materials: serializeMaterials(materials)
    };
}

export const actions = {
    toggleFavorite: async ({ request }) => {
        const formData = await request.formData();

        const id = formData.get('id');
        const favorite = formData.get('favorite') === 'true';

        await updateMaterial(id, {
            favorite
        });

        return {
            success: true
        };
    }
};