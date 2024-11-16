<!-- HowWeWork.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let gsap: any;
    let sectionRef: HTMLElement;
    let stepsRef: HTMLElement;
    let isVisible = false;

    const workingProcess = [
        {
            number: '01',
            title: 'Discovery',
            subtitle: 'Research & Planning',
            description: 'Understanding your vision and goals through deep research and analysis. We identify key opportunities and challenges.',
            points: [
                'Project Analysis',
                'Market Research',
                'User Insights'
            ],
            icon: `<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        },
        {
            number: '02',
            title: 'Strategy',
            subtitle: 'Concept Development',
            description: 'Crafting a comprehensive approach that aligns with your business objectives and user needs.',
            points: [
                'Solution Design',
                'Technical Planning',
                'Project Roadmap'
            ],
            icon: `<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        },
        {
            number: '03',
            title: 'Creation',
            subtitle: 'Development & Design',
            description: 'Bringing ideas to life through innovative design and cutting-edge development practices.',
            points: [
                'UI/UX Design',
                'Development',
                'Quality Assurance'
            ],
            icon: `<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        },
        {
            number: '04',
            title: 'Launch',
            subtitle: 'Deployment & Support',
            description: 'Ensuring successful deployment and providing ongoing support for optimal performance.',
            points: [
                'Testing & Launch',
                'Performance Monitoring',
                'Continuous Support'
            ],
            icon: `<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        }
    ];

    onMount(async () => {
        if (browser) {
            const gsapModule = await import('gsap');
            gsap = gsapModule.gsap;
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            isVisible = true;
            setTimeout(setupAnimations, 100);
        }

        return () => {
            if (gsap && ScrollTrigger) {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    });

    function setupAnimations() {
        if (!gsap || !sectionRef) return;

        // Animate section title
        gsap.from('.section-title', {
            scrollTrigger: {
                trigger: sectionRef,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Animate process steps
        gsap.from('.process-step', {
            scrollTrigger: {
                trigger: stepsRef,
                start: 'top bottom',
                end: 'bottom bottom',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: {
                amount: 0.6
            },
            ease: 'power3.out'
        });
    }
</script>

<section
        bind:this={sectionRef}
        class="relative min-h-screen bg-black py-16 md:py-32"
>
    <div class="container mx-auto px-4 md:px-6">
        <!-- Section Title -->
        <div class="section-title text-center mb-12 md:mb-24">
            <span class="font-grotesk text-white/60 uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4 block">
                Our Process
            </span>
            <h2 class="font-monument text-3xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6">
                How We Work
            </h2>
            <p class="mt-4 md:mt-6 text-white/60 max-w-2xl mx-auto font-grotesk text-sm md:text-base px-4">
                Our systematic approach ensures we deliver exceptional results through a proven process
                that combines innovation with technical excellence.
            </p>
        </div>

        <!-- Process Steps -->
        <div
                bind:this={stepsRef}
                class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
            {#each workingProcess as { number, title, subtitle, description, points, icon }}
                <div class="process-step group opacity-0">
                    <div class="relative min-h-[300px] md:h-[400px] bg-white/[0.02] backdrop-blur-xl rounded-lg
                        p-4 md:p-8 overflow-hidden transition-all duration-500">
                        <!-- Corner Hue Effects - Always visible on mobile, hover on desktop -->
                        <div class="absolute -top-20 -left-20 w-32 md:w-40 h-32 md:h-40 bg-purple-500/20
                            rounded-full blur-[32px] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="absolute -bottom-20 -right-20 w-32 md:w-40 h-32 md:h-40 bg-blue-500/20
                            rounded-full blur-[32px] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>

                        <!-- Content -->
                        <div class="relative h-full z-10">
                            <!-- Step Number & Icon -->
                            <div class="flex justify-between items-start">
                                <div class="text-white/10 font-monument text-6xl md:text-8xl select-none">
                                    {number}
                                </div>
                                <div class="text-white/90 md:text-white/60 md:group-hover:text-white/90 transition-colors duration-300">
                                    {@html icon}
                                </div>
                            </div>

                            <!-- Content Container -->
                            <div class="mt-6 md:mt-8">
                                <div class="space-y-3 md:space-y-4">
                                    <h3 class="font-monument text-xl md:text-2xl text-white">
                                        {title}
                                    </h3>
                                    <p class="font-grotesk text-white/40 text-xs md:text-sm uppercase tracking-wider">
                                        {subtitle}
                                    </p>
                                    <p class="font-grotesk text-white/60 text-xs md:text-sm leading-relaxed">
                                        {description}
                                    </p>

                                    <!-- Key Points -->
                                    <ul class="space-y-2 mt-4 md:mt-6">
                                        {#each points as point}
                                            <li class="flex items-center text-xs md:text-sm text-white/40">
                                                <span class="w-1 h-1 bg-white/40 rounded-full mr-2"></span>
                                                {point}
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- Card Border -->
                        <div class="absolute inset-0 rounded-lg border border-white/10 md:border-white/[0.05]
                            md:group-hover:border-white/10 transition-colors duration-500 pointer-events-none"></div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="postcss">
    :global(.process-step) {
        transform: translateZ(0);
        opacity: 1 !important;
    }

    .backdrop-blur-xl {
        -webkit-backdrop-filter: blur(24px);
        backdrop-filter: blur(24px);
    }

    @keyframes rotate {
        from {
            background-position: 0% center;
        }
        to {
            background-position: 200% center;
        }
    }
</style>