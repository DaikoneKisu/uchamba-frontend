import { redirect, type Cookies } from '@sveltejs/kit'

export function load({ cookies, url }: { cookies: Cookies; url: URL }) {
	if (!cookies.get('session')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`)
	}
}
