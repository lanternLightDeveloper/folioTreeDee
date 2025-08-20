import { fail } from '@sveltejs/kit';

export const actions = {
	submit: async ({ request }) => {
		try {
			const data = await request.formData();
			const full_name = data.get('full_name');
			const contact_point = data.get('contact_point');
			const message = data.get('message');

			// Validate inputs
			if (!full_name || !contact_point || !message) {
				return fail(400, { message: 'Missing required fields' });
			}

			// Insert into Supabase or wherever you're storing it
			// Example:
			// await supabase.from('inbox').insert({ full_name, contact_point, message });

			return { success: true };
		} catch (err) {
			console.error('Submit action error:', err);
			return fail(500, { message: 'Internal server error' });
		}
	}
} satisfies Actions;
