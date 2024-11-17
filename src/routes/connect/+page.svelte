<!-- src/routes/connect/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { enhance } from '$app/forms';
    import type { ContactFormResponse } from '$lib/types';

    let gsap: any;
    let mainContent: HTMLElement;
    let formContainer: HTMLElement;
    let form: HTMLFormElement;
    let submitted = false;
    let formError = '';
    let loading = false;

    onMount(async () => {
        if (browser) {
            const gsapModule = await import('gsap');
            gsap = gsapModule.gsap;

            gsap.set(mainContent, {
                opacity: 0,
            });

            setTimeout(() => {
                gsap.to(mainContent, {
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                });
            }, 100);
        }
    });

    function handleSubmit() {
        loading = true;
        formError = '';

        return async ({ result, update }) => {
            loading = false;

            if (result.type === 'failure') {
                formError = result.data?.message || 'An error occurred';

                gsap.from('.error-message', {
                    y: -20,
                    opacity: 0,
                    duration: 0.3
                });
            } else {
                const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

                tl.to(form, {
                    y: -20,
                    opacity: 0,
                    duration: 0.5
                }).then(() => {
                    submitted = true;
                    update();
                });
            }
        };
    }
</script>

<svelte:head>
    <title>Connect With Us | Lemonseed Studio</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 md:pt-28 pb-20 relative overflow-hidden">
    <!-- Gradient Orbs -->
    <div class="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]"></div>
    <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]"></div>

    <!-- Main Content -->
    <div bind:this={mainContent} class="container mx-auto px-4 md:px-8 relative z-10">
        <!-- Header -->
        <div class="max-w-2xl mx-auto text-center mb-16">
            <h1 class="font-monument text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                Let's Connect
            </h1>
            <p class="text-gray-400 text-lg font-grotesk">
                Have an idea? Let's bring it to life together.
            </p>
        </div>

        <!-- Content -->
        <div class="max-w-5xl mx-auto">
            <div class="relative">
                <!-- Glass Panel -->
                <div class="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/[0.05] shadow-2xl"></div>

                <!-- Grid Content -->
                <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <!-- Contact Info Side -->
                    <div class="p-8 md:p-12 lg:p-16 lg:border-r border-white/[0.05]">
                        <div class="space-y-10">
                            <!-- Contact sections -->
                            <div>
                                <h3 class="text-white/50 font-grotesk text-sm uppercase tracking-wider mb-6">Location</h3>
                                <p class="text-white font-grotesk">
                                    224, 3rd Floor<br/>
                                    KR Puram R S<br/>
                                    Bengaluru, KA 560016
                                </p>
                            </div>

                            <div>
                                <h3 class="text-white/50 font-grotesk text-sm uppercase tracking-wider mb-6">Connect ( Prompt Reply )</h3>
                                <div class="space-y-3">
                                    <a href="mailto:connect@lemonseed.studio" class="block text-white font-grotesk hover:text-blue-400 transition-colors">
                                        connect@lemonseed.studio
                                    </a>
                                    <p class="text-white font-grotesk">
                                        +91 636 7695 669
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 class="text-white/50 font-grotesk text-sm uppercase tracking-wider mb-6">Social</h3>
                                <div class="flex space-x-6">
                                    {#each ['Twitter', 'Instagram', 'LinkedIn'] as social}
                                        <a
                                                href="#{social.toLowerCase()}"
                                                class="text-white/70 hover:text-white transition-colors duration-300"
                                        >
                                            {social}
                                        </a>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Form Side -->
                    <div class="p-8 md:p-12 lg:p-16 relative">
                        {#if !submitted}
                            <form
                                    method="POST"
                                    bind:this={form}
                                    use:enhance={handleSubmit}
                                    class="space-y-8"
                            >
                                {#if formError}
                                    <div class="error-message bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">
                                        {formError}
                                    </div>
                                {/if}

                                <!-- Name Input -->
                                <div>
                                    <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            required
                                            class="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg px-6 py-4 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors duration-300 outline-none"
                                    />
                                </div>

                                <!-- Email Input -->
                                <div>
                                    <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            required
                                            class="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg px-6 py-4 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors duration-300 outline-none"
                                    />
                                </div>

                                <!-- Phone Input -->
                                <div>
                                    <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            class="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg px-6 py-4 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors duration-300 outline-none"
                                    />
                                </div>

                                <!-- Message Input -->
                                <div>
                                    <textarea
                                            name="message"
                                            placeholder="Your Message"
                                            required
                                            rows="4"
                                            class="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg px-6 py-4 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors duration-300 outline-none resize-none"
                                    ></textarea>
                                </div>

                                <!-- Submit Button -->
                                <button
                                        type="submit"
                                        disabled={loading}
                                        class="group w-full bg-white/[0.03] border border-white/[0.05] text-white font-grotesk py-4 px-8 rounded-lg relative overflow-hidden hover:bg-white/[0.05] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {#if loading}
                                        <span class="inline-block animate-pulse">Sending...</span>
                                    {:else}
                                        Send Message
                                    {/if}
                                </button>
                            </form>
                        {:else}
                            <div class="success-message text-center py-16">
                                <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h3 class="text-white font-monument text-2xl mb-4">Message Sent</h3>
                                <p class="text-gray-400 font-grotesk">
                                    We'll get back to you shortly.
                                </p>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    :global(body) {
        overflow-x: hidden;
    }
</style>