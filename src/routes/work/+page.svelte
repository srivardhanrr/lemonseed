<!-- OurWork.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let gsap: any;
    let filterButtons: HTMLElement;
    let workGrid: HTMLElement;
    let currentFilter = 'all';

    interface WorkItem {
        id: number;
        title: string;
        category: string;
        description: string;
        image: string;
        year: string;
    }

    interface WorkItem {
        id: number;
        title: string;
        category: string;
        description: string;
        image: string;
        year: string;
        slug: string;
    }

    const workItems: WorkItem[] = [
        {
            id: 1,
            title: "Digital Experience Platform",
            category: "website",
            description: "Modern web platform with immersive user experience",
            image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800",
            year: "2024",
            slug: "digital-experience-platform"
        },
        {
            id: 2,
            title: "Brand Evolution Campaign",
            category: "branding",
            description: "Complete brand identity transformation",
            image: "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=800",
            year: "2024"
        },
        {
            id: 3,
            title: "Product Launch Video",
            category: "video",
            description: "Cinematic product showcase",
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
            year: "2023"
        },
        {
            id: 4,
            title: "E-commerce Experience",
            category: "website",
            description: "Luxury shopping platform",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
            year: "2023"
        },
        {
            id: 5,
            title: "Art Direction",
            category: "design",
            description: "Visual storytelling through design",
            image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
            year: "2023"
        },
        {
            id: 6,
            title: "Mobile App Interface",
            category: "design",
            description: "Intuitive mobile experience design",
            image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800",
            year: "2024"
        }
    ];

    let filteredWork = workItems;
    let gridContainer: HTMLElement;

    onMount(async () => {
        if (browser) {
            const gsapModule = await import('gsap');
            gsap = gsapModule.gsap;
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            setupAnimations();
        }
    });

    function setupAnimations() {
        if (!gsap) return;

        // Animate work items on scroll
        const workItems = gridContainer.querySelectorAll('.work-item');
        workItems.forEach((item) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    }

    function handleItemHover(entering: boolean) {
        isHoveringLink = entering;
        if (cursor) {
            gsap.to(cursor, {
                scale: entering ? 1.5 : 1,
                duration: 0.3
            });
        }
    }

    function filterWork(category: string) {
        currentFilter = category;
        const tl = gsap.timeline();

        // Fade out current items
        tl.to('.work-item', {
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: () => {
                // Update filtered items
                filteredWork = category === 'all'
                    ? workItems
                    : workItems.filter(item => item.category === category);
            }
        });

        // Fade in new items
        tl.to('.work-item', {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
        });
    }
</script>

<div class="bg-black">
    <div class="container mx-auto px-4 md:px-8 pt-24 md:pt-28">
        <!-- Header Section -->
        <div class="mb-12">
            <h1 class="font-monument text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight mb-12">
                <span class="text-white">Our</span>
                <br />
                <span class="animate-gradient bg-gradient-to-r bg-clip-text text-transparent from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto]">
                    Work
                </span>
            </h1>

            <!-- Filter Pills -->
            <div
                    bind:this={filterButtons}
                    class="flex flex-wrap gap-3 mt-8"
            >
                {#each ['all', 'website', 'branding', 'video', 'design'] as category}
                    <button
                            class="relative px-5 py-2 rounded-full font-grotesk text-sm uppercase tracking-wider
                            transition-all duration-300 overflow-hidden group
                            {currentFilter === category
                                ? 'bg-white text-black'
                                : 'bg-white/10 hover:bg-white/20'}"
                            on:click={() => filterWork(category)}
                    >
                        <span class="relative z-10 text-white group-hover:text-white">
                            {category}
                        </span>
                    </button>
                {/each}
            </div>
        </div>

        <!-- Work Grid -->
        <div
                bind:this={gridContainer}
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20"
        >
            {#each filteredWork as item (item.id)}
                <a
                        href="/work/{item.slug}"
                        class="work-item group relative overflow-hidden bg-white/5 rounded-lg block"
                        on:mouseenter={() => handleItemHover(true)}
                        on:mouseleave={() => handleItemHover(false)}
                >
                    <!-- Image Container -->
                    <div class="aspect-[4/3] overflow-hidden">
                        <img
                                src={item.image}
                                alt={item.title}
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>

                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span class="block text-white/70 text-sm font-grotesk mb-2">{item.category} • {item.year}</span>
                            <h3 class="text-white text-xl md:text-2xl font-monument mb-2">{item.title}</h3>
                            <p class="text-white/80 font-grotesk">{item.description}</p>
                        </div>
                        <!-- View Project Button -->
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            <span class="inline-block border border-white/20 bg-black/50 backdrop-blur-sm text-white font-grotesk px-6 py-3 rounded-full transform group-hover:scale-110 transition-transform duration-300">
                                View Project
                            </span>
                        </div>
                    </div>

                    <!-- Arrow Indicator -->
                    <div class="absolute top-6 right-6 transform translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</div>

<style lang="postcss">
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .animate-gradient {
        animation: gradient 8s linear infinite;
    }
</style>