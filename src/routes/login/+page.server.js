import { fail, redirect } from '@sveltejs/kit';
import { validateLogin } from '$lib/server/auth';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();

        const email = formData.get('email')?.toString().trim().toLowerCase();
        const password = formData.get('password')?.toString();

        if (!email || !password) {
            return fail(400, {
                error: 'Bitte fülle alle Felder aus.'
            });
        }

        const user = await validateLogin(email, password);

        if (!user) {
            return fail(400, {
                error: 'E-Mail oder Passwort ist falsch.'
            });
        }

        cookies.set('session', user._id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 60 * 60 * 24 * 7
        });

        throw redirect(303, '/');
    }
};