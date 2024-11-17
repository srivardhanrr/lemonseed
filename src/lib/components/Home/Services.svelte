<!-- ServicesSection.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let servicesContainer: HTMLElement;
    let serviceCards: HTMLElement[] = [];
    let bentoGrid: HTMLElement;

    const services = [
        {
            title: 'Digital Marketing',
            description: 'Data-driven strategies that deliver measurable results through SEO, PPC, and comprehensive digital campaigns.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>`
        },
        {
            title: 'Content Creation',
            description: 'Compelling storytelling through video, graphics, and written content that resonates with your audience.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>`
        },
        {
            title: 'Tech Development',
            description: 'Cutting-edge web and app development solutions that transform ideas into powerful digital experiences.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>`
        },
        {
            title: 'Social Media Marketing',
            description: 'Strategic social media campaigns that build engagement, grow communities, and drive brand awareness.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>`
        }
    ];

    // Generate bento grid cells
    const bentoGridCells = Array(24).fill(null).map((_, index) => ({
        size: Math.random() > 0.85 ? 'large' : 'small',
        animationDelay: `${Math.random() * 5}s`
    }));

    onMount(() => {
        if (browser) {
            // No GSAP or animations needed
        }
    });
</script>

<section
        bind:this={servicesContainer}
        class="relative min-h-screen bg-black py-24 md:py-32 overflow-hidden perspective"
>
    <!-- Bento Grid Background -->
    <div
            bind:this={bentoGrid}
            class="absolute inset-0 overflow-hidden"
    >
        <div class="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-4 p-8 transform -rotate-12 scale-125">
            {#each bentoGridCells as cell, i}
                <div
                        class="bento-cell relative bg-gradient-to-br from-blue-500/10 to-purple-500/10
                           rounded-lg border border-white/5"
                        class:row-span-2={cell.size === 'large'}
                        class:col-span-2={cell.size === 'large'}
                        style="animation-delay: {cell.animationDelay}"
                >
                    <div class="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>

    <div class="relative container mx-auto px-4 md:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16 md:mb-24">
            <h2 class="font-monument text-4xl md:text-5xl lg:text-6xl text-white mb-6 relative">
                <span class="relative inline-block">
                    Our Services
                    <span class="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></span>
                </span>
            </h2>
            <p class="font-grotesk text-gray-400 max-w-2xl mx-auto text-lg">
                Elevating brands through innovative digital solutions and creative excellence
            </p>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {#each services as service, i}
                <div
                        bind:this={serviceCards[i]}
                        class="relative group bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-lg border border-white/10 backdrop-blur-sm transform-gpu transition-all duration-300 hover:-translate-y-1"
                >
                    <!-- Card Background Glow -->
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <!-- Service Icon -->
                    <div class="service-icon relative text-blue-500 mb-6 transform-gpu group-hover:scale-110 transition-transform duration-300">
                        {@html service.icon}
                    </div>

                    <!-- Service Content -->
                    <div class="service-content relative">
                        <h3 class="font-monument text-2xl text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                            {service.title}
                        </h3>

                        <p class="font-grotesk text-gray-400">
                            {service.description}
                        </p>
                    </div>

                    <!-- Decorative corner -->
                    <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-50">
                        <div class="absolute top-0 right-0 w-[2px] h-8 bg-gradient-to-b from-transparent to-blue-500/50"></div>
                        <div class="absolute top-0 right-0 h-[2px] w-8 bg-gradient-to-l from-transparent to-blue-500/50"></div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="postcss">
    .perspective {
        perspective: 1000px;
    }

    :global(.service-icon svg) {
        @apply transition-all duration-300;
    }

    .bento-cell {
        animation: float 6s infinite;
        opacity: 0.15;
    }

    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        50% {
            transform: translate(10px, 10px) rotate(3deg);
        }
    }
</style>