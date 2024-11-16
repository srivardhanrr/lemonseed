<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let gsap: any;
    let ScrollTrigger: any;

    interface Service {
        title: string;
        description: string;
        icon: string;
        details: string[];
    }

    const services: Service[] = [
        {
            title: 'Digital Marketing',
            description: 'Data-driven strategies that deliver results',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>`,
            details: ['SEO Optimization', 'PPC Campaigns', 'Analytics & Tracking', 'Marketing Automation']
        },
        {
            title: 'Content Creation',
            description: 'Engaging content that tells your story',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>`,
            details: ['Video Production', 'Blog Writing', 'Graphic Design', 'Visual Storytelling']
        },
        {
            title: 'Tech Development',
            description: 'Cutting-edge solutions for modern businesses',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>`,
            details: ['Web Development', 'Mobile Apps', 'Custom Software', 'API Integration']
        },
        {
            title: 'Social Media',
            description: 'Building meaningful connections online',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>`,
            details: ['Strategy Development', 'Content Calendar', 'Community Management', 'Performance Analysis']
        }
    ];

    let servicesSection: HTMLElement;
    let headerTitle: HTMLElement;
    let headerSubtitle: HTMLElement;
    let serviceCards: HTMLElement[] = [];
    let hoverTimelines: Map<number, GSAPTimeline> = new Map();

    onMount(async () => {
        if (browser) {
            const { gsap: g } = await import('gsap');
            const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger');
            gsap = g;
            ScrollTrigger = ST;
            gsap.registerPlugin(ScrollTrigger);
            setupAnimations();
        }
    });

    function setupAnimations() {
        if (!gsap || !servicesSection) return;

        // Reset any existing animations
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        gsap.globalTimeline.clear();

        // Set initial states
        gsap.set([headerTitle, headerSubtitle], {
            opacity: 0,
            y: 50
        });

        gsap.set(serviceCards, {
            opacity: 0,
            y: 100,
            scale: 0.95
        });

        // Create master timeline
        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: servicesSection,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Header animations
        masterTl.to(headerTitle, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        })
            .to(headerSubtitle, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.7");

        // Cards animation
        serviceCards.forEach((card, index) => {
            masterTl.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out"
            }, `-=${index > 0 ? 0.6 : 0}`);
        });
    }

    function onServiceEnter(event: MouseEvent, index: number) {
        if (!gsap) return;

        const card = event.currentTarget as HTMLElement;
        const icon = card.querySelector('.service-icon') as HTMLElement;
        const title = card.querySelector('h3') as HTMLElement;
        const description = card.querySelector('.description') as HTMLElement;
        const details = card.querySelector('.details') as HTMLElement;

        // Kill previous timeline if it exists
        if (hoverTimelines.has(index)) {
            hoverTimelines.get(index)?.kill();
        }

        const tl = gsap.timeline();
        hoverTimelines.set(index, tl);

        tl.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
        })
            .to(icon, {
                scale: 1.1,
                y: -5,
                duration: 0.4,
                ease: "back.out(1.7)"
            }, 0)
            .to(title, {
                y: -5,
                color: "#ffffff",
                duration: 0.3
            }, 0)
            .to(description, {
                opacity: 0.5,
                duration: 0.3
            }, 0)
            .fromTo(details,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4 },
                0.1
            );
    }

    function onServiceLeave(event: MouseEvent, index: number) {
        if (!gsap) return;

        const card = event.currentTarget as HTMLElement;
        const icon = card.querySelector('.service-icon') as HTMLElement;
        const title = card.querySelector('h3') as HTMLElement;
        const description = card.querySelector('.description') as HTMLElement;
        const details = card.querySelector('.details') as HTMLElement;

        // Kill previous timeline if it exists
        if (hoverTimelines.has(index)) {
            hoverTimelines.get(index)?.kill();
        }

        const tl = gsap.timeline();
        hoverTimelines.set(index, tl);

        tl.to([card, icon, title], {
            y: 0,
            scale: 1,
            color: "inherit",
            duration: 0.3,
            ease: "power2.inOut"
        })
            .to(description, {
                opacity: 1,
                duration: 0.3
            }, 0)
            .to(details, {
                y: 10,
                opacity: 0,
                duration: 0.3
            }, 0);
    }
</script>

<section
        bind:this={servicesSection}
        class="relative bg-black py-24 overflow-hidden"
>
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-30">
        <div class="absolute inset-0 bg-pattern animate-slide-slow"></div>
        <div class="absolute inset-0 backdrop-blur-[100px]"></div>
    </div>
<!--    <BackgroundGradient>-->
    <div class="container mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <h2
                    bind:this={headerTitle}
                    class="text-4xl md:text-5xl lg:text-6xl font-monument text-white mb-6"
            >
                Our Services
            </h2>
            <p
                    bind:this={headerSubtitle}
                    class="text-white/70 text-lg md:text-xl font-grotesk max-w-2xl mx-auto"
            >
                Elevating brands through innovative digital solutions and creative excellence
            </p>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each services as service, i}
                <div
                        bind:this={serviceCards[i]}
                        class="relative bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10"
                        on:mouseenter={(e) => onServiceEnter(e, i)}
                        on:mouseleave={(e) => onServiceLeave(e, i)}
                >
                    <!-- Service Icon -->
                    <div class="service-icon text-white/80 mb-6">
                        {@html service.icon}
                    </div>

                    <!-- Service Title -->
                    <h3 class="text-2xl font-monument text-white/90 mb-3">{service.title}</h3>

                    <!-- Service Description -->
                    <p class="description text-white/70 font-grotesk mb-6">{service.description}</p>

                    <!-- Service Details -->
                    <div class="details opacity-0">
                        <ul class="space-y-2">
                            {#each service.details as detail}
                                <li class="text-white/60 font-grotesk flex items-center">
                                    <span class="w-1.5 h-1.5 bg-white/40 rounded-full mr-2"></span>
                                    {detail}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/each}
        </div>
    </div>
<!--    </BackgroundGradient>-->
</section>

<style lang="postcss">
    .bg-pattern {
        background-image:
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 30px 30px;
    }

    .animate-slide-slow {
        animation: slideBackground 20s linear infinite;
    }

    @keyframes slideBackground {
        from {
            transform: translate(0, 0);
        }
        to {
            transform: translate(-30px, -30px);
        }
    }
</style>