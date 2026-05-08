import bcrypt from 'bcryptjs';
import { getUserByEmail, getUserById, serializeUser } from '$lib/server/users';

export async function hashPassword(password) {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}

export async function getUserFromSession(locals) {
    if (!locals.userId) {
        return null;
    }

    const user = await getUserById(locals.userId);

    if (!user) {
        return null;
    }

    return serializeUser(user);
}

export async function validateLogin(email, password) {
    const user = await getUserByEmail(email);

    if (!user) {
        return null;
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);

    if (!isValidPassword) {
        return null;
    }

    return serializeUser(user);
}