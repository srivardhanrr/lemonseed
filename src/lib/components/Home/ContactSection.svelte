<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import TextReveal from '$lib/components/Animation/TextReveal.svelte';
    import { Spotlight } from '$lib/components/ui/Spotlight';

    let gsap: any;
    let form: HTMLFormElement;
    let formFields: HTMLElement;
    let isSubmitting = false;

    onMount(async () => {
        if (browser) {
            const gsapModule = await import('gsap');
            gsap = gsapModule.gsap;
            setupAnimations();
        }
    });

    function setupAnimations() {
        if (!gsap || !formFields) return;

        gsap.set(formFields.children, {
            opacity: 0,
            y: 20
        });

        gsap.to(formFields.children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: formFields,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });
    }

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        if (isSubmitting) return;

        isSubmitting = true;
        const formData = new FormData(form);

        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Submission failed');

            // Handle success
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        } finally {
            isSubmitting = false;
        }
    }
</script>

<section class="relative min-h-screen flex items-center py-24 md:py-32">
    <Spotlight className="-top-40 right-0 md:right-60 md:-top-20" fill="blue" />

    <div class="w-full px-6 md:px-10 overflow-hidden relative z-10">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <TextReveal
                            text="Let's Create"
                            className="font-monument text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                    />
                    <TextReveal
                            text="Something Great"
                            className="font-monument text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight block"
                    />

                    <div class="mt-8 text-gray-400 space-y-6">
                        <p class="text-lg">Ready to bring your vision to life? We're here to help create exceptional digital experiences that drive real results.</p>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:hello@yourcompany.com" class="hover:text-white transition-colors">hello@yourcompany.com</a>
                            </div>
                            <div class="flex items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Your Location, City, Country</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <form
                            bind:this={form}
                            on:submit={handleSubmit}
                            class="space-y-6"
                            bind:this={formFields}
                    >
                        <div class="space-y-2">
                            <label for="name" class="block text-sm text-gray-400">Name</label>
                            <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    placeholder="Your name"
                            />
                        </div>

                        <div class="space-y-2">
                            <label for="email" class="block text-sm text-gray-400">Email</label>
                            <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    placeholder="your@email.com"
                            />
                        </div>

                        <div class="space-y-2">
                            <label for="message" class="block text-sm text-gray-400">Message</label>
                            <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="4"
                                    class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                                    placeholder="Tell us about your project"
                            ></textarea>
                        </div>

                        <button
                                type="submit"
                                disabled={isSubmitting}
                                class="group relative inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span class="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="postcss">
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus {
        -webkit-text-fill-color: white;
        -webkit-box-shadow: 0 0 0px 1000px #0000 inset;
        transition: background-color 5000s ease-in-out 0s;
    }
</style>