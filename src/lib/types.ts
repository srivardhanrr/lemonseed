// src/lib/types.ts

export interface ContactForm {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export type ContactFormResponse = {
    success: boolean;
    message: string;
}