import type { Cookies } from '@sveltejs/kit'

export function DELETE({ cookies }: { cookies: Cookies }) {
	cookies.delete('session', {
		path: '/'
	})

	return new Response(null, { status: 200 })
}
