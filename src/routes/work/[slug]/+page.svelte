<!-- routes/work/[slug]/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let gsap: any;
    let headerSection: HTMLElement;
    let contentSection: HTMLElement;

    interface ProjectImage {
        url: string;
        caption?: string;
        size: 'full' | 'half';
    }

    interface ProjectDetails {
        title: string;
        category: string;
        year: string;
        client: string;
        role: string;
        description: string;
        challenge: string;
        solution: string;
        outcome: string;
        technologies: string[];
        images: ProjectImage[];
        nextProject: {
            title: string;
            slug: string;
            image: string;
        };
    }

    // Example project data (this would typically come from your backend)
    const project: ProjectDetails = {
        title: "Digital Experience Platform",
        category: "Website Development",
        year: "2024",
        client: "TechCorp Industries",
        role: "Design & Development",
        description: "A revolutionary digital platform that transforms how users interact with technology products.",
        challenge: "Creating an intuitive interface that simplifies complex technical information while maintaining engagement and visual appeal.",
        solution: "Implemented an innovative design system with interactive elements and smooth transitions, making technical content accessible and engaging.",
        outcome: "50% increase in user engagement, 40% reduction in bounce rate, and significant improvement in user satisfaction scores.",
        technologies: ["React", "Three.js", "WebGL", "GSAP", "Tailwind CSS"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=1400",
                size: "full"
            },
            {
                url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
                size: "half"
            },
            {
                url: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800",
                size: "half"
            },
            {
                url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=1400",
                caption: "User dashboard showcasing key metrics and interactive elements",
                size: "full"
            }
        ],
        nextProject: {
            title: "Brand Evolution Campaign",
            slug: "brand-evolution-campaign",
            image: "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=800"
        }
    };

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

        // Header animations
        gsap.from(headerSection.querySelectorAll('.animate-in'), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Scroll animations for images
        const images = contentSection.querySelectorAll('.project-image');
        images.forEach((image) => {
            gsap.from(image, {
                scrollTrigger: {
                    trigger: image,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Scroll animations for text sections
        const textSections = contentSection.querySelectorAll('.text-section');
        textSections.forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    }
</script>

<div class="bg-black min-h-screen">
    <!-- Project Header -->
    <section
            bind:this={headerSection}
            class="container mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-20"
    >
        <div class="max-w-5xl">
            <div class="space-y-6">
                <p class="animate-in text-white/70 font-grotesk uppercase tracking-wider">
                    {project.category} • {project.year}
                </p>
                <h1 class="animate-in font-monument text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-8">
                    {project.title}
                </h1>
                <p class="animate-in text-white/80 text-xl md:text-2xl font-grotesk leading-relaxed max-w-3xl">
                    {project.description}
                </p>
                <div class="animate-in pt-8 flex flex-wrap gap-8 text-white/70 font-grotesk">
                    <div>
                        <p class="text-sm uppercase tracking-wider mb-2">Client</p>
                        <p class="text-white">{project.client}</p>
                    </div>
                    <div>
                        <p class="text-sm uppercase tracking-wider mb-2">Role</p>
                        <p class="text-white">{project.role}</p>
                    </div>
                    <div>
                        <p class="text-sm uppercase tracking-wider mb-2">Year</p>
                        <p class="text-white">{project.year}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <section bind:this={contentSection}>
        <!-- Hero Image -->
        <div class="project-image w-full mb-20">
            <img
                    src={project.images[0].url}
                    alt={project.title}
                    class="w-full h-[70vh] object-cover"
            />
        </div>

        <!-- Project Details -->
        <div class="container mx-auto px-4 md:px-8">
            <div class="max-w-5xl mx-auto">
                <!-- Challenge & Solution -->
                <div class="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
                    <div class="text-section">
                        <h2 class="text-white font-monument text-2xl mb-4">Challenge</h2>
                        <p class="text-white/80 font-grotesk leading-relaxed">
                            {project.challenge}
                        </p>
                    </div>
                    <div class="text-section">
                        <h2 class="text-white font-monument text-2xl mb-4">Solution</h2>
                        <p class="text-white/80 font-grotesk leading-relaxed">
                            {project.solution}
                        </p>
                    </div>
                </div>

<!--                &lt;!&ndash; Project Images &ndash;&gt;-->
<!--                <div class="space-y-12 mb-20">-->
<!--                    {#each project.images.slice(1) as image}-->
<!--                        <div class="project-image {image.size === 'half' ? 'md:w-1/2' : 'w-full'}">-->
<!--                            <img-->
<!--                                    src={image.url}-->
<!--                                    alt=""-->
<!--                                    class="w-full aspect-video object-cover"-->
<!--                            />-->
<!--                            {#if image.caption}-->
<!--                                <p class="text-white/60 text-sm mt-4 font-grotesk">-->
<!--                                    {image.caption}-->
<!--                                </p>-->
<!--                            {/if}-->
<!--                        </div>-->
<!--                    {/each}-->
<!--                </div>-->

                <div class="space-y-12 mb-20">
                    <!-- Group half-width images in pairs -->
                    {#each project.images.slice(1) as image, i}
                        {#if image.size === 'half' && project.images[i + 2]?.size === 'half'}
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <!-- First half-width image -->
                                <div
                                        class="project-image"
                                >
                                    <div class="relative overflow-hidden rounded-lg cursor-pointer">
                                        <img
                                                src={image.url}
                                                alt=""
                                                class="w-full aspect-video object-cover transform transition-transform duration-700 hover:scale-105"
                                        />
                                        <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    {#if image.caption}
                                        <p class="text-white/60 text-sm mt-4 font-grotesk">
                                            {image.caption}
                                        </p>
                                    {/if}
                                </div>
                                <!-- Second half-width image -->
                                <div
                                        class="project-image"
                                >
                                    <div class="relative overflow-hidden rounded-lg cursor-pointer">
                                        <img
                                                src={project.images[i + 2].url}
                                                alt=""
                                                class="w-full aspect-video object-cover transform transition-transform duration-700 hover:scale-105"
                                        />
                                        <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    {#if project.images[i + 2].caption}
                                        <p class="text-white/60 text-sm mt-4 font-grotesk">
                                            {project.images[i + 2].caption}
                                        </p>
                                    {/if}
                                </div>
                            </div>
                        {:else if image.size === 'full' || (image.size === 'half' && !project.images[i + 2])}
                            <!-- Full-width or unpaired half-width images -->
                            <div
                                    class="project-image {image.size === 'half' ? 'md:w-1/2' : 'w-full'}"
                            >
                                <div class="relative overflow-hidden rounded-lg cursor-pointer">
                                    <img
                                            src={image.url}
                                            alt=""
                                            class="w-full aspect-video object-cover transform transition-transform duration-700 hover:scale-105"
                                    />
                                    <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                {#if image.caption}
                                    <p class="text-white/60 text-sm mt-4 font-grotesk">
                                        {image.caption}
                                    </p>
                                {/if}
                            </div>
                        {/if}
                    {/each}
                </div>

                <!-- Outcome & Technologies -->
                <div class="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
                    <div class="text-section">
                        <h2 class="text-white font-monument text-2xl mb-4">Outcome</h2>
                        <p class="text-white/80 font-grotesk leading-relaxed">
                            {project.outcome}
                        </p>
                    </div>
                    <div class="text-section">
                        <h2 class="text-white font-monument text-2xl mb-4">Technologies</h2>
                        <div class="flex flex-wrap gap-2">
                            {#each project.technologies as tech}
                                <span class="px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm font-grotesk">
                                    {tech}
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Next Project -->
        <a
                href="/work/{project.nextProject.slug}"
                class="block relative group"
        >
            <div class="relative h-[50vh] overflow-hidden">
                <div class="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
                <img
                        src={project.nextProject.image}
                        alt={project.nextProject.title}
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                        <p class="text-white/70 font-grotesk uppercase tracking-wider mb-4">Next Project</p>
                        <h3 class="text-white font-monument text-3xl md:text-4xl lg:text-5xl">
                            {project.nextProject.title}
                        </h3>
                    </div>
                </div>
            </div>
        </a>
    </section>
</div>

<style lang="postcss">
    .project-image {
        @apply relative;
    }

    .project-image img {
        @apply rounded-lg;
    }
</style>