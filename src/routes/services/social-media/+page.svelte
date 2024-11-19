<!-- src/routes/services/social-media/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let gsap: any;
    let sections: HTMLElement[] = [];

    interface Service {
        icon: string;
        title: string;
        description: string;
        features: string[];
        image: string;
    }

    const services: Service[] = [
        {
            icon: "📱",
            title: "Social Media Strategy",
            description: "Custom-tailored content strategy that aligns with your brand voice and business goals.",
            features: [
                "Content calendar planning",
                "Competitor analysis",
                "Hashtag strategy",
                "Trend forecasting"
            ],
            image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a"
        },
        {
            icon: "🎯",
            title: "Content Creation",
            description: "Engaging content that stops the scroll and drives meaningful interactions.",
            features: [
                "Viral Reels production",
                "Professional photography",
                "Graphic design",
                "Copywriting"
            ],
            image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec"
        },
        {
            icon: "💫",
            title: "Community Management",
            description: "Active engagement that builds a loyal community around your brand.",
            features: [
                "Comment management",
                "DM responses",
                "Story interactions",
                "Follower engagement"
            ],
            image: "https://images.unsplash.com/photo-1556155092-490a1ba16284"
        },
        {
            icon: "📊",
            title: "Analytics & Growth",
            description: "Data-driven decisions to continuously optimize your social media performance.",
            features: [
                "Performance tracking",
                "Growth analysis",
                "ROI reporting",
                "Strategy optimization"
            ],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
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
    <title>Social Media Marketing Services - Lemonseed Studio</title>
    <meta name="description" content="Transform your social media presence with our comprehensive marketing services. From strategy to execution, we help brands dominate their digital presence." />
</svelte:head>

<div class="bg-black min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center pt-32 overflow-hidden">
        <!-- Gradient Orbs -->
        <div class="absolute inset-0 overflow-hidden -z-10">
            <div class="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
            <div class="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 class="font-monument text-4xl md:text-6xl text-white mb-6">
                            Next-Level Social Media Marketing
                        </h1>
                        <p class="text-gray-400 text-xl font-grotesk leading-relaxed mb-8">
                            Stop posting randomly and hoping for results. Our comprehensive social media
                            marketing service delivers strategic content that grows your brand and drives real business results.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <a
                                    href="#services"
                                    class="inline-flex items-center px-8 py-4 rounded-xl font-grotesk bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                            >
                                Explore Services
                                <span class="ml-2">→</span>
                            </a>
                            <a
                                    href="/connect"
                                    class="inline-flex items-center px-8 py-4 rounded-xl font-grotesk bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                            >
                                Let's Talk
                            </a>
                        </div>
                    </div>
                    <div class="relative">
                        <div class="aspect-[4/3] rounded-2xl overflow-hidden">
                            <img
                                    src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0"
                                    alt="Social media marketing showcase"
                                    class="w-full h-full object-cover"
                            />
                        </div>
                        <!-- Stats Card -->
                        <div class="absolute bottom-8 -left-8 bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20">
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <div class="text-2xl text-white font-monument mb-1">10x</div>
                                    <div class="text-gray-400 font-grotesk text-sm">Engagement Growth</div>
                                </div>
                                <div>
                                    <div class="text-2xl text-white font-monument mb-1">3x</div>
                                    <div class="text-gray-400 font-grotesk text-sm">Revenue Increase</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" bind:this={sections[0]} class="py-20 relative">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="font-monument text-4xl text-white mb-4">
                    Full-Service Social Media Management
                </h2>
                <p class="text-gray-400 text-lg font-grotesk max-w-2xl mx-auto">
                    Everything you need to dominate your social media presence, all in one place.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {#each services as service}
                    <div class="group relative">
                        <!-- Glass Card -->
                        <div class="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20">
                            <!-- Content -->
                            <div class="relative z-10">
                                <div class="text-4xl mb-4">{service.icon}</div>
                                <h3 class="text-2xl text-white font-monument mb-4">{service.title}</h3>
                                <p class="text-gray-400 font-grotesk mb-6">{service.description}</p>

                                <!-- Features -->
                                <ul class="space-y-3">
                                    {#each service.features as feature}
                                        <li class="flex items-center text-gray-300 font-grotesk">
                                            <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                                            {feature}
                                        </li>
                                    {/each}
                                </ul>
                            </div>

                            <!-- Background Image with Gradient Overlay -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                                <img
                                        src={service.image}
                                        alt={service.title}
                                        class="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Process Section -->
    <section bind:this={sections[1]} class="py-20 relative">
        <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto">
                <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-12 rounded-2xl border border-white/10">
                    <h2 class="font-monument text-3xl text-white mb-8 text-center">
                        Our Proven Process
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="text-3xl text-blue-400 font-monument mb-2">01</div>
                            <h3 class="text-white font-monument mb-2">Strategy</h3>
                            <p class="text-gray-400 font-grotesk">Custom strategy aligned with your goals</p>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl text-blue-400 font-monument mb-2">02</div>
                            <h3 class="text-white font-monument mb-2">Create</h3>
                            <p class="text-gray-400 font-grotesk">Engaging content that converts</p>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl text-blue-400 font-monument mb-2">03</div>
                            <h3 class="text-white font-monument mb-2">Engage</h3>
                            <p class="text-gray-400 font-grotesk">Active community management</p>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl text-blue-400 font-monument mb-2">04</div>
                            <h3 class="text-white font-monument mb-2">Optimize</h3>
                            <p class="text-gray-400 font-grotesk">Data-driven improvements</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section bind:this={sections[2]} class="py-20">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-12 rounded-2xl border border-white/10">
                    <h2 class="font-monument text-3xl text-white mb-6">
                        Ready to Transform Your Social Media?
                    </h2>
                    <p class="text-gray-400 text-lg font-grotesk mb-8">
                        Let's create a social media presence that drives real business results.
                    </p>
                    <a
                            href="/connect"
                            class="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-grotesk hover:opacity-90 transition-opacity"
                    >
                        Schedule a Strategy Call
                        <span class="ml-2">→</span>
                    </a>
                </div>
            </div>
        </div>
    </section>
</div>

<style lang="postcss">
    :global(body) {
        @apply bg-black;
    }
</style>