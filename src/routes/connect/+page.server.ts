import { fail, type Actions } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            return fail(400, {
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        try {
            await resend.emails.send({
                from: 'Lemonseed Studio <connect@lemonseed.studio>',
                to: 'srivardhan@lemonseed.studio', // Replace with your email
                subject: `New Contact Form Submission from ${name}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `
            });

            return {
                success: true,
                message: 'Message sent successfully!'
            };
        } catch (error) {
            console.error('Error sending email:', error);

            return fail(500, {
                success: false,
                message: 'Failed to send message. Please try again later.'
            });
        }
    }
} satisfies Actions;