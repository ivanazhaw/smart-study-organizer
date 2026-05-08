import { redirect } from '@sveltejs/kit';
import { getUserById, serializeUser } from '$lib/server/users';

const publicRoutes = ['/', '/login', '/register'];

export async function handle({ event, resolve }) {
    const sessionUserId = event.cookies.get('session');

    if (sessionUserId) {
        const user = await getUserById(sessionUserId);
        event.locals.user = user ? serializeUser(user) : null;
    } else {
        event.locals.user = null;
    }

    const isPublicRoute = publicRoutes.includes(event.url.pathname);

    if (!event.locals.user && !isPublicRoute) {
        throw redirect(303, '/');
    }

    if (event.locals.user && ['/login', '/register'].includes(event.url.pathname)) {
        throw redirect(303, '/');
    }

    return resolve(event);
}