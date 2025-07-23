import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
	const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: { fetch },
		cookies: {
			getAll: () => cookies.getAll(),
			setAll: (newCookies) => {
				for (const cookie of newCookies) {
					cookies.set(cookie.name, cookie.value, cookie.options);
				}
			}
		}
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();
	const {
		data: { user }
	} = await supabase.auth.getUser();

	return { session, user };
};
