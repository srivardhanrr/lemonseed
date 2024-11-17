<!-- src/routes/connect/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { enhance } from '$app/forms';

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

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 md:pt-28 pb-10 md:pb-20 relative overflow-hidden">
    <!-- Gradient Orbs - Adjusted for better mobile appearance -->
    <div class="absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 bg-purple-500/20 rounded-full blur-[100px] md:blur-[128px]"></div>
    <div class="absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 bg-blue-500/20 rounded-full blur-[100px] md:blur-[128px]"></div>

    <!-- Main Content -->
    <div bind:this={mainContent} class="container mx-auto px-4 md:px-8 relative z-10">
        <!-- Header - Adjusted spacing for mobile -->
        <div class="max-w-2xl mx-auto text-center mb-8 md:mb-16">
            <h1 class="font-monument text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6">
                Let's Connect
            </h1>
            <p class="text-gray-400 text-base md:text-lg font-grotesk px-4">
                Have an idea? Let's bring it to life together.
            </p>
        </div>

        <!-- Content -->
        <div class="max-w-5xl mx-auto">
            <div class="relative">
                <!-- Glass Panel - Adjusted border radius for mobile -->
                <div class="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl rounded-2xl md:rounded-3xl border border-white/[0.05] shadow-2xl"></div>

                <!-- Grid Content -->
                <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <!-- Contact Info Side - Improved mobile spacing -->
                    <div class="p-6 md:p-8 lg:p-16 lg:border-r border-white/[0.05]">
                        <div class="space-y-8 md:space-y-10">
                            <!-- Contact sections -->
                            <div>
                                <h3 class="text-white/50 font-grotesk text-sm uppercase tracking-wider mb-4 md:mb-6">Location</h3>
                                <p class="text-white font-grotesk text-sm md:text-base">
                                    123 Design Avenue<br/>
                                    Creative District<br/>
                                    New York, NY 10001
                                </p>
                            </div>

                            <div>
                                <h3 class="text-white/50 font-grotesk text-sm uppercase tracking-wider mb-4 md:mb-6">Contact</h3>
                                <div class="space-y-2 md:space-y-3">
                                    <a
                                            href="mailto:hello@lemonseed.studio"
                                            class="block text-white font-grotesk text-sm md:text-base hover:text-blue-400 transition-colors"
                                    >
                                        hello@lemonseed.studio
                                    </a>
                                    <p class="text-white font-grotesk text-sm md:text-base">
                                        +1 (555) 123-4567
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 class="text-white/50 font-grotesk text-sm uppercase tracking-wider mb-4 md:mb-6">Social</h3>
                                <div class="flex flex-wrap gap-4 md:gap-6">
                                    {#each ['Twitter', 'Instagram', 'LinkedIn'] as social}
                                        <a
                                                href="#{social.toLowerCase()}"
                                                class="text-white/70 text-sm md:text-base hover:text-white transition-colors duration-300"
                                        >
                                            {social}
                                        </a>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Form Side - Improved mobile spacing -->
                    <div class="p-6 md:p-8 lg:p-16 relative border-t lg:border-t-0 border-white/[0.05]">
                        {#if !submitted}
                            <form
                                    method="POST"
                                    bind:this={form}
                                    use:enhance={handleSubmit}
                                    class="space-y-6 md:space-y-8"
                            >
                                {#if formError}
                                    <div class="error-message bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm md:text-base">
                                        {formError}
                                    </div>
                                {/if}

                                <!-- Name Input -->
                                <div class="space-y-2">
                                    <label for="name" class="text-white/50 text-sm font-grotesk">Name</label>
                                    <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Enter your name"
                                            required
                                            class="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder-white/30 focus:border-blue-500/50 transition-colors duration-300 outline-none"
                                    />
                                </div>

                                <!-- Email Input -->
                                <div class="space-y-2">
                                    <label for="email" class="text-white/50 text-sm font-grotesk">Email</label>
                                    <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            required
                                            class="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder-white/30 focus:border-blue-500/50 transition-colors duration-300 outline-none"
                                    />
                                </div>

                                <!-- Phone Input -->
                                <div class="space-y-2">
                                    <label for="phone" class="text-white/50 text-sm font-grotesk">Phone (Optional)</label>
                                    <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            class="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder-white/30 focus:border-blue-500/50 transition-colors duration-300 outline-none"
                                    />
                                </div>

                                <!-- Message Input -->
                                <div class="space-y-2">
                                    <label for="message" class="text-white/50 text-sm font-grotesk">Message</label>
                                    <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us about your project"
                                            required
                                            rows="4"
                                            class="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder-white/30 focus:border-blue-500/50 transition-colors duration-300 outline-none resize-none"
                                    ></textarea>
                                </div>

                                <!-- Submit Button -->
                                <button
                                        type="submit"
                                        disabled={loading}
                                        class="w-full bg-white/[0.03] border border-white/[0.05] text-white font-grotesk text-sm md:text-base py-3 md:py-4 px-6 md:px-8 rounded-lg relative overflow-hidden hover:bg-white/[0.05] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    {#if loading}
                                        <span class="inline-block animate-pulse">Sending...</span>
                                    {:else}
                                        Send Message
                                    {/if}
                                </button>
                            </form>
                        {:else}
                            <div class="success-message text-center py-12 md:py-16">
                                <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h3 class="text-white font-monument text-xl md:text-2xl mb-4">Message Sent</h3>
                                <p class="text-gray-400 font-grotesk text-sm md:text-base">
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

    /* Touch device optimizations */
    @media (hover: none) {
        input, textarea {
            font-size: 16px !important; /* Prevents zoom on iOS */
        }
    }
</style>