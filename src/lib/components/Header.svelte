<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let gsap: any;
    let isMenuOpen = false;
    let prevScrollPos = 0;
    let isHeaderVisible = true;
    let isScrolled = false;
    let menuOverlay: HTMLDivElement;
    let menuItems: HTMLUListElement;
    let menuBackground: HTMLDivElement;
    let menuItemsRefs: HTMLLIElement[] = [];
    let brandName: HTMLAnchorElement;

    const menuLinks = [
        { title: 'Our Work', path: '/work', description: 'View our latest works' },
        { title: 'Studio', path: '/studio', description: 'Meet our creative team' },
        { title: 'Services', path: '/services', description: 'Discover what we do' },
        { title: 'Connect', path: '/connect', description: 'Let\'s create together' }
    ];

    onMount(async () => {
        if (browser) {
            const gsapModule = await import('gsap');
            gsap = gsapModule.gsap;
            setupAnimations();
        }

        window.addEventListener('scroll', () => {
            const currentScrollPos = window.pageYOffset;
            isHeaderVisible = prevScrollPos > currentScrollPos || currentScrollPos < 50;
            isScrolled = currentScrollPos > 50;
            prevScrollPos = currentScrollPos;
        });

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('scroll', () => {});
        };
    });

    let menuTl: gsap.core.Timeline;

    function setupAnimations() {
        if (!gsap) return;

        // Kill any existing animations
        if (menuTl) {
            menuTl.kill();
        }

        menuTl = gsap.timeline({
            paused: true,
            onReverseComplete: () => {
                if (menuOverlay) {
                    menuOverlay.style.display = 'none';
                }
            }
        });



        const rightPanel = menuOverlay.querySelector('.right-panel');
        const circles = menuOverlay.querySelectorAll('.animate-spin-slow, .animate-spin-reverse');
        const pattern = menuOverlay.querySelectorAll('.bg-pattern');

        // Reset all elements to their initial state
        gsap.set([menuItemsRefs, menuItems, rightPanel, circles, pattern], {
            clearProps: 'all'
        });

        menuTl
            .set(menuOverlay, {
                display: 'block',
            })
            // Background animation
            .fromTo(
                menuBackground,
                {
                    clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
                    opacity: 0
                },
                {
                    clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.inOut'
                }
            )
            // Reset and animate menu items
            .fromTo(
                menuItemsRefs,
                {
                    y: 50,
                    opacity: 0,
                    rotation: 5
                },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.7,
                    stagger: 0.05,
                    ease: 'power3.out'
                },
                '-=0.5'
            )
            // Animate right panel
            .fromTo(
                rightPanel,
                {
                    xPercent: 100,
                    opacity: 0
                },
                {
                    xPercent: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out'
                },
                '-=0.7'
            )
            // Animate decorative elements
            .fromTo(
                [circles, pattern],
                {
                    opacity: 0,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power2.out'
                },
                '-=0.7'
            );

        return menuTl;
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            setupAnimations().play();
        } else {
            document.body.style.overflow = 'auto';

            // Create a separate timeline for closing animation
            const closeTl = gsap.timeline({
                onComplete: () => {
                    menuOverlay.style.display = 'none';
                    // Reset all animations
                    gsap.set([menuItemsRefs, menuItems, '.right-panel', '.animate-spin-slow', '.animate-spin-reverse', '.bg-pattern'], {
                        clearProps: 'all'
                    });
                }
            });

            closeTl
                .to(menuItemsRefs, {
                    y: -50,
                    opacity: 0,
                    rotation: -5,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'power2.in'
                })
                .to('.right-panel', {
                    xPercent: 100,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in'
                }, '-=0.5')
                .to(menuBackground, {
                    clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power3.in'
                }, '-=0.3');
        }
    }

    function onMenuItemEnter(event: MouseEvent) {
        if (!gsap) return;

        const target = event.currentTarget as HTMLLIElement;
        const underline = target.querySelector('.underline') as HTMLSpanElement;
        const text = target.querySelector('.menu-text') as HTMLSpanElement;

        gsap.to(underline, {
            scaleX: 1,
            duration: 0.3,
            ease: 'power2.out'
        });

        gsap.to(text, {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    function onMenuItemLeave(event: MouseEvent) {
        if (!gsap) return;

        const target = event.currentTarget as HTMLLIElement;
        const underline = target.querySelector('.underline') as HTMLSpanElement;
        const text = target.querySelector('.menu-text') as HTMLSpanElement;

        gsap.to(underline, {
            scaleX: 0,
            duration: 0.3,
            ease: 'power2.in'
        });

        gsap.to(text, {
            y: 0,
            duration: 0.3,
            ease: 'power2.in'
        });
    }
</script>

<div class="relative">
    <header
            class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
            class:translate-y-0={isHeaderVisible}
            class:-translate-y-full={!isHeaderVisible}
    >
        <div
                class="transition-all duration-500 ease-in-out"
                class:bg-transparent={!isScrolled}
                class:backdrop-blur-md={isScrolled}
                class:bg-black={isScrolled}
                class:bg-opacity-30={isScrolled}
        >
            <div class="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
                <a
                        bind:this={brandName}
                        href="/"
                        class="text-2xl md:text-3xl text-white transition-colors z-50 relative font-monument hover:text-white/80"
                >
                    lemonseed studio
                </a>

                <button
                        class="relative z-50 w-8 h-8 md:w-10 md:h-10 focus:outline-none group"
                        on:click={toggleMenu}
                        aria-label="Toggle menu"
                >
                    <div class="flex flex-col justify-center items-center h-full space-y-1.5 md:space-y-2">
            <span
                    class="block w-6 md:w-8 h-0.5 bg-white transition-all duration-500 group-hover:w-5 md:group-hover:w-6"
                    class:rotate-45={isMenuOpen}
                    class:translate-y-2={isMenuOpen}
                    class:!w-6={isMenuOpen}
                    class:md:!w-8={isMenuOpen}
            ></span>
                        <span
                                class="block w-5 md:w-6 h-0.5 bg-white transition-all duration-500"
                                class:scale-x-0={isMenuOpen}
                        ></span>
                        <span
                                class="block w-6 md:w-8 h-0.5 bg-white transition-all duration-500 group-hover:w-5 md:group-hover:w-6"
                                class:-rotate-45={isMenuOpen}
                                class:-translate-y-2={isMenuOpen}
                                class:!w-6={isMenuOpen}
                                class:md:!w-8={isMenuOpen}
                        ></span>
                    </div>
                </button>
            </div>
        </div>
    </header>

    <div
            bind:this={menuOverlay}
            class="fixed inset-0 w-full h-screen z-40 hidden pointer-events-none"
            class:pointer-events-auto={isMenuOpen}
    >
        <div
                bind:this={menuBackground}
                class="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"
        ></div>

        <div class="absolute inset-0 opacity-30">
            <div class="absolute inset-0 bg-pattern animate-slide-slow"></div>
            <div class="absolute inset-0 backdrop-blur-[100px]"></div>
        </div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full">
            <nav class="h-full flex items-center justify-center p-8">
                <ul
                        bind:this={menuItems}
                        class="flex flex-col items-start space-y-6 perspective w-full max-w-md"
                >
                    {#each menuLinks as { title, path }, i}
                        <li
                                bind:this={menuItemsRefs[i]}
                                class="relative cursor-pointer w-full group"
                                on:mouseenter={onMenuItemEnter}
                                on:mouseleave={onMenuItemLeave}
                        >
                            <a
                                    href={path}
                                    class="relative flex items-center w-full text-4xl lg:text-6xl font-monument"
                                    on:click={toggleMenu}
                            >
                <span class="menu-text relative inline-block text-white/50 group-hover:text-white transition-colors duration-300">
                  {title}
                </span>
                                <span class="menu-number text-sm text-white/30 ml-4 group-hover:text-white/50">
                  0{i + 1}
                </span>
                                <span class="absolute top-1/2 -translate-y-1/2 right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                            </a>
                            <div class="absolute -bottom-2 left-0 w-full h-px">
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                            </div>
                        </li>
                    {/each}
                </ul>
            </nav>

            <div class="hidden lg:flex items-center justify-center p-8">
                <div class="relative w-full max-w-md aspect-square right-panel-content">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-4/5 h-4/5 rounded-full bg-gradient-to-tr from-white/5 to-transparent border border-white/10 animate-spin-slow"></div>
                        <div class="absolute w-3/5 h-3/5 rounded-full bg-gradient-to-bl from-white/5 to-transparent border border-white/10 animate-spin-reverse"></div>
                        <div class="absolute w-2/5 h-2/5 rounded-full bg-gradient-to-r from-white/5 to-transparent border border-white/10 animate-spin-slow"></div>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
<!--                        <div class="w-1/2 h-1/2 bg-gradient-to-tr from-white/10 to-transparent backdrop-blur-sm rounded-full flex items-center justify-center">-->
<!--                            <span class="font-grotesk text-white/70 text-xl">Create Together</span>-->
<!--                        </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .perspective {
        perspective: 1000px;
    }

    :global(body) {
        overflow-x: hidden;
    }

    .bg-pattern {
        background-image:
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 30px 30px;
    }

    .animate-slide-slow {
        animation: slideBackground 20s linear infinite;
    }

    .animate-spin-slow {
        animation: spin 15s linear infinite;
    }

    .animate-spin-reverse {
        animation: spinReverse 10s linear infinite;
    }

    @keyframes slideBackground {
        from {
            transform: translate(0, 0);
        }
        to {
            transform: translate(-30px, -30px);
        }
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes spinReverse {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
</style>