import { fail, redirect } from '@sveltejs/kit';
import { getUserByEmail, createUser } from '$lib/server/users';
import { hashPassword } from '$lib/server/auth';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();

        const name = formData.get('name')?.toString().trim();
        const email = formData.get('email')?.toString().trim().toLowerCase();
        const password = formData.get('password')?.toString();

        if (!name || !email || !password) {
            return fail(400, {
                error: 'Bitte fülle alle Felder aus.'
            });
        }

        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

        if (!passwordRegex.test(password)) {
            return fail(400, {
                error:
                    'Das Passwort muss mindestens 6 Zeichen und ein Sonderzeichen enthalten.'
            });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return fail(400, {
                error: 'Diese E-Mail-Adresse ist bereits registriert.'
            });
        }

        const passwordHash = await hashPassword(password);

        const result = await createUser({
            name,
            email,
            passwordHash
        });

        cookies.set('session', result.insertedId.toString(), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 60 * 60 * 24 * 7
        });

        throw redirect(303, '/');
    }
};