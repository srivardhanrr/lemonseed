<!-- HeroSection.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { Spotlight } from "$lib/components/ui/Spotlight";
    import TextReveal from "$lib/components/Animation/TextReveal.svelte";

    let gsap: any;
    let subheadline: HTMLElement;
    let ctaButton: HTMLElement;
    let experiencesText: HTMLElement;

    onMount(async () => {
        if (browser) {
            gsap = (await import('gsap')).gsap;

            gsap.set([subheadline, ctaButton, experiencesText], {
                opacity: 0,
                y: 20
            });

            setTimeout(setupAnimations, 100);
        }
    });

    function setupAnimations() {
        if (!gsap || !subheadline || !ctaButton || !experiencesText) return;

        gsap.timeline({ defaults: { ease: "power3.out" } })
            .to(experiencesText, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 1.2
            })
            .to(subheadline, {
                opacity: 1,
                y: 0,
                duration: 1
            }, "-=0.5")
            .to(ctaButton, {
                opacity: 1,
                y: 0,
                duration: 0.8
            }, "-=0.5");
    }
</script>

<section class="relative min-h-screen flex items-center pt-24 md:pt-28">
    <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="blue" />
    <Spotlight className="top-96 -bottom-20 left-50" fill="blue" />

    <div class="w-full px-6 md:px-10 overflow-hidden relative z-10">
        <div class="max-w-7xl">
            <div class="mb-6">
                <TextReveal
                        text="We Create"
                        className="font-monument text-5xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight"
                />
                <TextReveal
                        text="Digital"
                        className="font-monument text-5xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight block"
                />
                <span
                        bind:this={experiencesText}
                        class="inline-block font-monument text-5xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight animate-gradient bg-gradient-to-r bg-clip-text text-transparent from-[#000030] via-blue-900 to-[#000030] bg-[length:200%_auto]"
                >
                    Experiences
                </span>
            </div>

            <div class="mt-6 max-w-xl">
                <p
                        bind:this={subheadline}
                        class="text-sm md:text-xl text-gray-400 leading-relaxed"
                >
                    We craft exceptional digital experiences that elevate brands
                    and drive meaningful results through innovative design.
                </p>

                <a
                        href="/connect"
                        bind:this={ctaButton}
                        class="group inline-flex items-center mt-10 relative z-20"
                >
                    <span class="relative z-10 pr-10 py-5 text-white text-md md:text-lg tracking-wider uppercase">
                        Let's Create Together
                    </span>
                    <span class="absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                    <span class="absolute bottom-0 left-0 w-full h-px overflow-hidden">
                        <span class="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-800 w-[200%] animate-slide"></span>
                    </span>
                </a>
            </div>
        </div>
    </div>
</section>

<style lang="postcss">
    @keyframes slide {
        from { transform: translateX(-100%); }
        to { transform: translateX(0%); }
    }

    .animate-slide {
        animation: slide 2s linear infinite;
    }

    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .animate-gradient {
        animation: gradient 8s linear infinite;
    }
</style>