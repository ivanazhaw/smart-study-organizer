import { fail } from '@sveltejs/kit';
import { getUserById, updateUserPassword } from '$lib/server/users';
import { hashPassword, verifyPassword } from '$lib/server/auth';

export const actions = {
    changePassword: async ({ request, locals }) => {
        const formData = await request.formData();

        const currentPassword = formData.get('currentPassword')?.toString();
        const newPassword = formData.get('newPassword')?.toString();
        const confirmPassword = formData.get('confirmPassword')?.toString();

        if (!currentPassword || !newPassword || !confirmPassword) {
            return fail(400, {
                passwordError: 'Bitte fülle alle Passwort-Felder aus.'
            });
        }

        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

        if (!passwordRegex.test(newPassword)) {
            return fail(400, {
                passwordError:
                    'Das neue Passwort muss mindestens 6 Zeichen und ein Sonderzeichen enthalten.'
            });
        }

        if (newPassword !== confirmPassword) {
            return fail(400, {
                passwordError: 'Die neuen Passwörter stimmen nicht überein.'
            });
        }

        const user = await getUserById(locals.user._id);

        if (!user) {
            return fail(404, {
                passwordError: 'Benutzer wurde nicht gefunden.'
            });
        }

        const currentPasswordIsValid = await verifyPassword(currentPassword, user.passwordHash);

        if (!currentPasswordIsValid) {
            return fail(400, {
                passwordError: 'Das aktuelle Passwort ist falsch.'
            });
        }

        const newPasswordHash = await hashPassword(newPassword);

        await updateUserPassword(locals.user._id, newPasswordHash);

        return {
            passwordSuccess: 'Passwort wurde erfolgreich geändert.'
        };
    }
};