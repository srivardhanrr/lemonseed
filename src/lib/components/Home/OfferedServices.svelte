<!-- src/routes/services/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let gsap: any;
    let sections: HTMLElement[] = [];

    interface ServiceSection {
        id: string;
        title: string;
        subtitle: string;
        description: string;
        benefits: string[];
        imageUrl: string;
        imageSide: 'left' | 'right';
    }

    const services: ServiceSection[] = [
        {
            id: 'content-creation',
            title: 'Content Creation',
            subtitle: 'Craft Your Story',
            description: `In today's digital landscape, compelling content is the cornerstone of brand success. Our content creation service combines creative storytelling with strategic thinking to produce content that not only captures attention but drives engagement and conversions. We specialize in video production, photography, copywriting, and animation to bring your brand story to life.`,
            benefits: [
                'High-quality video and photo content',
                'Engaging copywriting and storytelling',
                'Motion graphics and animations',
                'Brand-aligned visual assets'
            ],
            imageUrl: 'https://images.unsplash.com/photo-1539883305165-f691affc6c54',
            imageSide: 'right'
        },
        {
            id: 'digital-marketing',
            title: 'Digital Marketing',
            subtitle: 'Amplify Your Reach',
            description: `Transform your digital presence with our data-driven marketing solutions. We craft strategic campaigns that connect your brand with your target audience at the right time, through the right channels. Our approach combines creative innovation with analytical precision to deliver measurable results that drive your business forward.`,
            benefits: [
                'Search engine optimization (SEO)',
                'Paid advertising campaigns (PPC)',
                'Email marketing automation',
                'Performance analytics'
            ],
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
            imageSide: 'left'
        },
        {
            id: 'social-media',
            title: 'Social Media Management',
            subtitle: 'Engage Your Audience',
            description: `Elevate your social media presence with our strategic management services. We help brands build meaningful connections with their audience through creative content, engaging conversations, and targeted campaigns. Our social media experts stay ahead of platform trends to ensure your content reaches and resonates with your target audience.`,
            benefits: [
                'Content strategy and creation',
                'Community management',
                'Paid social campaigns',
                'Analytics and growth strategy'
            ],
            imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
            imageSide: 'right'
        },
        {
            id: 'web-development',
            title: 'Web Development',
            subtitle: 'Build Your Digital Future',
            description: `Create exceptional digital experiences with our cutting-edge web development services. We combine technical expertise with creative design to build websites and applications that not only look stunning but perform flawlessly. From custom websites to complex web applications, we bring your digital vision to life.`,
            benefits: [
                'Custom website development',
                'E-commerce solutions',
                'Progressive web apps',
                'Content management systems'
            ],
            imageUrl: 'https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7',
            imageSide: 'left'
        }
    ];

    onMount(async () => {
        if (browser) {
            const gsapModule = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap = gsapModule.gsap;
            gsap.registerPlugin(ScrollTrigger);

            setupAnimations();
        }
    });

    function setupAnimations() {
        if (!gsap) return;

        sections.forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }
</script>

<svelte:head>
    <title>Our Services - Lemonseed Studio</title>
    <meta name="description" content="Discover our comprehensive range of digital services including content creation, digital marketing, social media management, and web development." />
</svelte:head>

<div class="bg-black min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-20">
        <div class="md:px-12 mx-auto px-4">
            <h1 class="font-monument text-5xl md:text-7xl text-white mb-6">
                Our Services
            </h1>
            <p class="text-gray-400 text-lg md:text-xl max-w-3xl font-grotesk leading-relaxed">
                We combine creativity with cutting-edge technology to deliver exceptional digital solutions
                that help your brand thrive in today's digital landscape.
            </p>
        </div>
    </section>

    <!-- Services Sections -->
    {#each services as service, index}
        <section
                bind:this={sections[index]}
                class="py-20 md:py-28 relative overflow-hidden"
                id={service.id}
        >
            <!-- Background Elements -->
            <div class="absolute inset-0 opacity-30">
                <div class="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5"></div>
                {#if index % 2 === 0}
                    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                {/if}
            </div>

            <div class="md:px-12 mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <!-- Content Section -->
                    <div
                            class="content-section order-2 {service.imageSide === 'left' ? 'lg:order-2' : 'lg:order-1'}"
                    >
                        <h2 class="font-monument text-4xl md:text-5xl text-white mb-3">
                            {service.title}
                        </h2>
                        <p class="text-blue-400 text-xl mb-6 font-grotesk">
                            {service.subtitle}
                        </p>
                        <p class="text-gray-300 leading-relaxed mb-10 font-grotesk">
                            {service.description}
                        </p>

                        <!-- Benefits -->
                        <div class="mb-8">
                            <h3 class="text-white text-xl mb-6 font-monument">What We Offer</h3>
                            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {#each service.benefits as benefit}
                                    <li class="benefit-item flex items-start text-gray-300 font-grotesk bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                                        <span class="text-blue-400 mr-3 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        {benefit}
                                    </li>
                                {/each}
                            </ul>
                        </div>

                        <a
                                href={`/services/${service.id}`}
                                class="inline-flex items-center text-white group hover:text-blue-400 transition-colors duration-300"
                        >
                            <span class="mr-2 font-grotesk">Learn More</span>
                            <span class="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                    </div>

                    <!-- Image Section -->
                    <div
                            class="image-section order-1 {service.imageSide === 'left' ? 'lg:order-1' : 'lg:order-2'}"
                    >
                        <div class="relative aspect-[4/3] rounded-lg overflow-hidden">
                            <img
                                    src={service.imageUrl}
                                    alt={`${service.title} services`}
                                    class="w-full h-full object-cover"
                            />
                            <!-- Overlay -->
                            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    {/each}
</div>

<style lang="postcss">
    :global(body) {
        @apply bg-black;
    }
</style>