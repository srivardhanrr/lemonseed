<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import TextReveal from '$lib/components/Animation/TextReveal.svelte';

    let gsap: any;
    let projectRefs: HTMLElement[] = [];
    let sectionRef: HTMLElement;

    const featuredProjects: Project[] = [
        {
            title: 'Digital Experience Platform',
            description: 'Enterprise-scale platform built for seamless user engagement',
            image: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=1000',
            category: 'Platform Development',
            link: '/work/digital-platform'
        },
        {
            title: 'Brand Evolution',
            description: 'Complete digital transformation for legacy brand',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000',
            category: 'Branding',
            link: '/work/brand-evolution'
        },
        {
            title: 'E-commerce Solution',
            description: 'Custom shopping experience with AI-powered recommendations',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
            category: 'E-commerce',
            link: '/work/ecommerce'
        }
    ];

    onMount(async () => {
        if (browser) {
            gsap = (await import('gsap')).gsap;
            const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
            gsap.registerPlugin(ScrollTrigger);

            setupAnimations();
        }
    });

    function setupAnimations() {
        if (!gsap || !projectRefs.length) return;

        projectRefs.forEach((project, index) => {
            gsap.from(project, {
                scrollTrigger: {
                    trigger: project,
                    start: 'top bottom-=100',
                    end: 'top center',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                delay: index * 0.2,
                ease: 'power3.out'
            });
        });
    }
</script>

<section bind:this={sectionRef} class="py-24 px-4 md:px-10 md:py-32 bg-black relative overflow-hidden">
    <div class="mb-16 md:mb-24">
        <TextReveal
                text="Featured Projects"
                className="font-monument text-4xl md:text-5xl lg:text-6xl text-white mb-6"
        />
        <p class="text-gray-400 text-lg md:text-xl max-w-2xl">
            Explore our selected works showcasing innovation and creativity in digital experiences.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each featuredProjects as project, i}
            <div
                    bind:this={projectRefs[i]}
                    class="group relative overflow-hidden"
            >
                <div class="aspect-[4/3] overflow-hidden bg-gray-900 relative">
                    <div
                            class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>
                    <img
                            src={project.image}
                            alt={project.title}
                            class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                </div>

                <div class="mt-6">
                        <span class="text-blue-500 text-sm uppercase tracking-wider">
                            {project.category}
                        </span>
                    <h3 class="text-white text-xl md:text-2xl font-monument mt-2">
                        {project.title}
                    </h3>
                    <p class="text-gray-400 mt-2">
                        {project.description}
                    </p>
                </div>

                <a
                        href={project.link}
                        class="mt-4 inline-flex items-center text-white group/link"
                >
                        <span class="relative">
                            View Project
                            <span class="absolute -bottom-1 left-0 w-full h-px bg-white/50 transform origin-left transition-transform duration-300 scale-x-0 group-hover/link:scale-x-100"></span>
                        </span>
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                    >
                        <path
                                fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                        />
                    </svg>
                </a>
            </div>
        {/each}
    </div>

    <div class="mt-16 md:mt-24 text-center">
        <a
                href="/work"
                class="inline-flex items-center justify-center px-8 py-4 text-lg text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors duration-300"
        >
            View All Projects
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
            >
                <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                />
            </svg>
        </a>
    </div>
</section>