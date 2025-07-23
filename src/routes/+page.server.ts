import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	submit: async ({ request, locals }) => {
		try {
			const formData = await request.formData();
			const full_name = formData.get('full_name');
			const contact_point = formData.get('contact_point');
			const message = formData.get('message');

			if (!full_name || !contact_point || !message) {
				return fail(400, { error: 'All fields are required.' });
			}

			const submissionData = {
				full_name,
				contact_point,
				message
			};

			const { error } = await locals.supabase.from('inbox').insert(submissionData);

			if (error) {
				console.error('Supabase insert error:', error.message);
				return fail(500, { error: 'Database insert failed.' });
			}

			return { success: true };
		} catch (error) {
			console.error('Server error in form action:', error);
			return fail(500, { error: 'Server error occurred.' });
		}
	}
};
