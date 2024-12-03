# Footer.svelte
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let gsap: any;
    let footerLinks: HTMLDivElement;
    let socialLinks: HTMLDivElement;
    let footerContent: HTMLDivElement;

    const links = [
        { title: 'Work', path: '/work' },
        { title: 'Studio', path: '/studio' },
        { title: 'Services', path: '/services' },
        { title: 'Connect', path: '/connect' }
    ];

    const socialMedia = [
        { title: 'Instagram', path: 'https://instagram.com' },
        { title: 'Twitter', path: 'https://twitter.com' },
        { title: 'LinkedIn', path: 'https://linkedin.com' },
        { title: 'Dribbble', path: 'https://dribbble.com' }
    ];

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
        if (!gsap || !footerContent) return;

        gsap.from(footerContent, {
            scrollTrigger: {
                trigger: footerContent,
                start: "top bottom",
                end: "bottom bottom",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }

    function onLinkHover(event: MouseEvent) {
        if (!gsap) return;
        const target = event.currentTarget as HTMLAnchorElement;
        const underline = target.querySelector('.link-underline');

        gsap.to(underline, {
            scaleX: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    function onLinkLeave(event: MouseEvent) {
        if (!gsap) return;
        const target = event.currentTarget as HTMLAnchorElement;
        const underline = target.querySelector('.link-underline');

        gsap.to(underline, {
            scaleX: 0,
            duration: 0.3,
            ease: "power2.in"
        });
    }
</script>

<footer class="relative w-full bg-black py-20 overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-30">
        <div class="absolute inset-0 bg-pattern animate-slide-slow"></div>
        <div class="absolute inset-0 backdrop-blur-[100px]"></div>
    </div>

    <!-- Main Content -->
    <div bind:this={footerContent} class="relative z-10 w-full px-6 md:px-10">
        <!-- Logo & Tagline -->
        <div class="mb-16">
            <a href="/" class="inline-block">
                <div class="flex items-center gap-3 mb-4">
                    <img
                            src="/images/logo.png"
                            alt="Lemonseed Studio Logo"
                            class="w-8 h-8 md:w-10 md:h-10"
                            width={32}
                            height={32}
                    />
                    <h2 class="font-monument text-2xl md:text-3xl text-white">
                        Lemonseed.studio
                    </h2>
                </div>
            </a>
            <p class="text-gray-400 max-w-md">
                Creating exceptional digital experiences that elevate brands and drive meaningful results.
            </p>
        </div>

        <!-- Links Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <!-- Navigation -->
            <div bind:this={footerLinks}>
                <h3 class="text-white text-sm uppercase tracking-wider mb-6">Navigation</h3>
                <ul class="space-y-4">
                    {#each links as { title, path }}
                        <li>
                            <a
                                    href={path}
                                    class="text-gray-400 hover:text-white transition-colors relative inline-block"
                                    on:mouseenter={onLinkHover}
                                    on:mouseleave={onLinkLeave}
                            >
                                {title}
                                <span class="link-underline absolute bottom-0 left-0 w-full h-px bg-white origin-left scale-x-0"></span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Social Links -->
            <div bind:this={socialLinks}>
                <h3 class="text-white text-sm uppercase tracking-wider mb-6">Connect</h3>
                <ul class="space-y-4">
                    {#each socialMedia as { title, path }}
                        <li>
                            <a
                                    href={path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-gray-400 hover:text-white transition-colors relative inline-block"
                                    on:mouseenter={onLinkHover}
                                    on:mouseleave={onLinkLeave}
                            >
                                {title}
                                <span class="link-underline absolute bottom-0 left-0 w-full h-px bg-white origin-left scale-x-0"></span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Contact Info -->
            <div>
                <h3 class="text-white text-sm uppercase tracking-wider mb-6">Contact</h3>
                <ul class="space-y-4">
                    <li>
                        <a
                                href="mailto:hello@lemonseed.studio"
                                class="text-gray-400 hover:text-white transition-colors relative inline-block"
                                on:mouseenter={onLinkHover}
                                on:mouseleave={onLinkLeave}
                        >
                            hello@lemonseed.studio
                            <span class="link-underline absolute bottom-0 left-0 w-full h-px bg-white origin-left scale-x-0"></span>
                        </a>
                    </li>
                    <li class="text-gray-400">
                        123 Creative Street<br />
                        Design District, 12345
                    </li>
                </ul>
            </div>

            <!-- Newsletter -->
            <div>
                <h3 class="text-white text-sm uppercase tracking-wider mb-6">Newsletter</h3>
                <p class="text-gray-400 mb-4">Stay updated with our latest works and news</p>
                <form class="relative">
                    <input
                            type="email"
                            placeholder="Enter your email"
                            class="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <button
                            type="submit"
                            class="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Lemonseed Studio. All rights reserved.
            </p>
            <div class="flex space-x-6">
                <a href="/privacy" class="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="/terms" class="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>

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