<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let gsap: any;
    let heroSection: HTMLElement;
    let headlineText: HTMLElement;
    let subheadline: HTMLElement;
    let ctaButton: HTMLElement;
    let backgroundElements: HTMLElement;

    onMount(async () => {
        if (browser) {
            const gsapModule = await import('gsap');
            gsap = gsapModule.gsap;

            // Initial content animations
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(headlineText,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2 }
            )
                .fromTo(subheadline,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    '-=0.8'
                )
                .fromTo(ctaButton,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.6'
                );

            // Animate background elements
            gsap.to('.flow-line', {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power2.out',
                stagger: 0.2
            });

            // Parallax effect on scroll
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                gsap.to(backgroundElements, {
                    y: scrolled * 0.1,
                    duration: 0.5,
                    ease: 'none'
                });
            });
        }
    });

    function onCtaHover(event: MouseEvent, entering: boolean) {
        if (!gsap) return;

        const target = event.currentTarget as HTMLElement;
        const arrow = target.querySelector('.arrow-icon');

        gsap.to(arrow, {
            x: entering ? 10 : 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
</script>

<section
        bind:this={heroSection}
        class="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D1F]"
>
    <!-- Dynamic background elements -->
    <div class="absolute inset-0">
        <!-- Gradient base -->
        <div class="absolute inset-0 bg-gradient-to-br from-violet-950 via-[#0D0D1F] to-cyan-950"></div>

        <!-- Animated background lines -->
        <div bind:this={backgroundElements} class="absolute inset-0">
            <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#7C3AED;stop-opacity:0.2" />
                        <stop offset="100%" style="stop-color:#06B6D4;stop-opacity:0.2" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#7C3AED;stop-opacity:0.1" />
                        <stop offset="100%" style="stop-color:#06B6D4;stop-opacity:0.1" />
                    </linearGradient>
                </defs>

                <!-- Flowing lines -->
                <path class="flow-line" d="M0,20 Q25,40 50,20 T100,20" fill="none" stroke="url(#gradient1)" stroke-width="0.5"
                      style="stroke-dasharray: 150; stroke-dashoffset: 150;" />
                <path class="flow-line" d="M0,40 Q25,60 50,40 T100,40" fill="none" stroke="url(#gradient1)" stroke-width="0.5"
                      style="stroke-dasharray: 150; stroke-dashoffset: 150;" />
                <path class="flow-line" d="M0,60 Q25,80 50,60 T100,60" fill="none" stroke="url(#gradient2)" stroke-width="0.5"
                      style="stroke-dasharray: 150; stroke-dashoffset: 150;" />
                <path class="flow-line" d="M0,80 Q25,100 50,80 T100,80" fill="none" stroke="url(#gradient2)" stroke-width="0.5"
                      style="stroke-dasharray: 150; stroke-dashoffset: 150;" />
            </svg>

            <!-- Digital grid overlay -->
            <div class="absolute inset-0">
                <div class="digital-grid absolute inset-0 opacity-20"></div>
                <div class="digital-dots absolute inset-0 opacity-30"></div>
            </div>
        </div>

        <!-- Overlay gradient for depth -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#0D0D1F] via-transparent to-[#0D0D1F] opacity-60"></div>
    </div>

    <!-- Main content -->
    <div class="container mx-auto px-4 relative z-20">
        <div class="max-w-4xl mx-auto text-center">
            <h1
                    bind:this={headlineText}
                    class="text-4xl md:text-6xl lg:text-7xl font-monument text-white mb-6 leading-tight"
            >
                Crafting Digital
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400">
                    Experiences
                </span>
                <br />
                That Inspire
            </h1>

            <p
                    bind:this={subheadline}
                    class="text-lg md:text-xl text-white/80 mb-12 font-grotesk max-w-2xl mx-auto"
            >
                We're a creative studio that transforms ideas into exceptional digital realities.
                Through innovative design and cutting-edge technology, we bring your vision to life.
            </p>

            <div bind:this={ctaButton}>
                <a
                        href="/connect"
                        class="inline-flex items-center space-x-4 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 hover:from-violet-500/30 hover:to-cyan-500/30 text-white px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 group shadow-lg shadow-violet-500/10"
                        on:mouseenter={(e) => onCtaHover(e, true)}
                        on:mouseleave={(e) => onCtaHover(e, false)}
                >
                    <span class="text-lg font-grotesk">Start Your Project</span>
                    <span class="arrow-icon transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    </div>

    <!-- Mouse scroll indicator -->
    <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full p-1 backdrop-blur-sm">
            <div class="w-1 h-2 bg-gradient-to-b from-violet-400 to-cyan-400 rounded-full animate-bounce mx-auto"></div>
        </div>
        <span class="text-white/50 text-sm mt-2 font-grotesk">Scroll</span>
    </div>
</section>

<style lang="postcss">
    .digital-grid {
        background-image:
                linear-gradient(to right, rgba(124, 58, 237, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(124, 58, 237, 0.1) 1px, transparent 1px);
        background-size: 50px 50px;
    }

    .digital-dots {
        background-image: radial-gradient(circle, rgba(124, 58, 237, 0.1) 1px, transparent 1px);
        background-size: 20px 20px;
    }

    @keyframes flowLine {
        0% {
            stroke-dashoffset: 150;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 0.3;
        }
        50% {
            opacity: 0.6;
        }
    }

    .flow-line {
        animation: flowLine 3s ease-out forwards;
    }
</style>