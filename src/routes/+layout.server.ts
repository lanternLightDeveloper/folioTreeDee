import { createServerClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
	const supabase = createServerClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
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
