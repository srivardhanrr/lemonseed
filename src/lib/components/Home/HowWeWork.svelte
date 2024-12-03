<!-- HowWeWork.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { Spotlight } from "$lib/components/ui/Spotlight";
    import TextReveal from "$lib/components/Animation/TextReveal.svelte";

    let gsap: any;
    let sectionRef: HTMLElement;
    let descriptionText: HTMLElement;

    const workingProcess = [
        {
            number: '01',
            title: 'Discovery',
            subtitle: 'Research & Planning',
            description: 'Understanding your vision and goals through deep research and analysis. We identify key opportunities and challenges.',
            points: ['Project Analysis', 'Market Research', 'User Insights'],
            icon: `<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        },
        {
            number: '02',
            title: 'Strategy',
            subtitle: 'Concept Development',
            description: 'Crafting a comprehensive approach that aligns with your business objectives and user needs.',
            points: ['Solution Design', 'Technical Planning', 'Project Roadmap'],
            icon: `<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        },
        {
            number: '03',
            title: 'Creation',
            subtitle: 'Development & Design',
            description: 'Bringing ideas to life through innovative design and cutting-edge development practices.',
            points: ['UI/UX Design', 'Development', 'Quality Assurance'],
            icon: `<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        },
        {
            number: '04',
            title: 'Launch',
            subtitle: 'Deployment & Support',
            description: 'Ensuring successful deployment and providing ongoing support for optimal performance.',
            points: ['Testing & Launch', 'Performance Monitoring', 'Continuous Support'],
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

            gsap.set([descriptionText, '.process-step'], {
                opacity: 0,
                y: 40
            });

            setupAnimations();
        }

        return () => {
            if (gsap?.ScrollTrigger) {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    });

    function setupAnimations() {
        if (!gsap || !sectionRef) return;

        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef,
                start: 'top 80%',
                once: true
            }
        })
            .to(descriptionText, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .fromTo('.process-step',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    clearProps: 'all'
                },
                '-=0.5'
            );
    }
</script>

<section
        bind:this={sectionRef}
        class="relative min-h-screen bg-black py-16 md:py-32 overflow-hidden"
>
    <Spotlight className="top-96 left-0 md:left-60" fill="blue" />

    <div class="w-full px-6 md:px-12 relative z-10">
        <!-- Section Title -->
        <div class="flex flex-col items-center justify-center text-center mb-12 md:mb-24 relative z-10">
            <div class="overflow-hidden">
                <TextReveal
                        text="How We Work"
                        className="font-monument text-4xl md:text-6xl lg:text-7xl text-white inline-block"
                />
            </div>
            <p
                    bind:this={descriptionText}
                    class="mt-8 text-gray-400 max-w-2xl font-grotesk text-sm md:text-lg px-4"
            >
                Our systematic approach ensures we deliver exceptional results through a proven process
                that combines innovation with technical excellence.
            </p>
        </div>

        <!-- Process Steps -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-[2000px] mx-auto">
            {#each workingProcess as { number, title, subtitle, description, points, icon }}
                <div class="process-step group">
                    <div class="relative h-full min-h-[420px] md:min-h-[480px] bg-gradient-to-br from-black/50 to-black/30
                        backdrop-blur-xl rounded-lg p-6 md:p-8 overflow-hidden transition-all duration-500
                        border border-white/20 md:border-white-10 hover:border-white/20">

                        <!-- Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-br from-brand-secondary/40 via-transparent to-purple-900/20
                            opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <!-- Content -->
                        <div class="relative h-full z-10">
                            <!-- Step Number & Icon -->
                            <div class="flex justify-between items-start">
                                <div class="text-white/20 md:text-white/10 font-monument text-6xl md:text-7xl select-none
                                    group-hover:text-white/20 transition-colors duration-300">
                                    {number}
                                </div>
                                <div class="text-white/60 group-hover:text-white transition-colors duration-300">
                                    {@html icon}
                                </div>
                            </div>

                            <!-- Content Container -->
                            <div class="mt-8">
                                <div class="space-y-4">
                                    <h3 class="font-monument text-xl md:text-2xl text-white">{title}</h3>
                                    <p class="font-grotesk text-blue-400/80 text-sm uppercase tracking-wider">{subtitle}</p>
                                    <p class="font-grotesk text-gray-400 text-sm leading-relaxed">{description}</p>

                                    <!-- Key Points -->
                                    <ul class="space-y-3 mt-6">
                                        {#each points as point}
                                            <li class="flex items-center text-sm text-gray-400 group-hover:text-gray-300
                                                transition-colors duration-300">
                                                <span class="w-1.5 h-1.5 bg-blue-500/50 rounded-full mr-3
                                                    group-hover:bg-blue-400 transition-colors duration-300"></span>
                                                {point}
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="postcss">
    .process-step {
        transform: translateZ(0);
        will-change: transform, opacity;
    }

    .backdrop-blur-xl {
        -webkit-backdrop-filter: blur(24px);
        backdrop-filter: blur(24px);
    }

    @media (prefers-reduced-motion: reduce) {
        .process-step {
            transition: none !important;
        }
    }
</style>