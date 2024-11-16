<!-- Cursor.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let cursorOuter: HTMLDivElement;
    let cursorInner: HTMLDivElement;
    let isVisible = false;

    onMount(() => {
        if (browser) {
            // Only show custom cursor on non-touch devices
            if (window.matchMedia("(pointer: fine)").matches) {
                document.documentElement.style.cursor = 'none';
                isVisible = true;
                document.addEventListener('mousemove', moveCursor);
                document.addEventListener('mouseenter', showCursor);
                document.addEventListener('mouseleave', hideCursor);
                addHoverListeners();
            }
        }

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseenter', showCursor);
            document.removeEventListener('mouseleave', hideCursor);
            document.documentElement.style.cursor = 'auto';
        };
    });

    function moveCursor(e: MouseEvent) {
        if (!cursorOuter || !cursorInner) return;

        // Move the outer cursor with a delay
        requestAnimationFrame(() => {
            cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-2px, -2px)`;
        });

        // Move the inner cursor immediately
        cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }

    function showCursor() {
        isVisible = true;
    }

    function hideCursor() {
        isVisible = false;
    }

    function addHoverListeners() {
        const clickables = document.querySelectorAll('a, button, input, [role="button"]');

        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOuter?.classList.add('cursor-hover');
                cursorInner?.classList.add('cursor-hover');
            });

            el.addEventListener('mouseleave', () => {
                cursorOuter?.classList.remove('cursor-hover');
                cursorInner?.classList.remove('cursor-hover');
            });
        });
    }
</script>

{#if isVisible}
    <div class="cursor-wrapper fixed inset-0 pointer-events-none z-[9999]">
        <!-- Mouse pointer shape -->
        <div
                bind:this={cursorOuter}
                class="fixed top-0 left-0 duration-200 ease-out will-change-transform"
        >
            <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    class="text-orange-500 drop-shadow-lg"
            >
                <path
                        fill="currentColor"
                        d="M4,0 L20,16 L12,16 L10,24 L8,17 L4,16 Z"
                />
                <path
                        fill="currentColor"
                        fillOpacity="0.3"
                        d="M4,0 L20,16 L12,16 L10,24 L8,17 L4,16 Z"
                        filter="url(#glow)"
                />
            </svg>
            <!-- Glow filter -->
            <svg width="0" height="0">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
            </svg>
        </div>

        <!-- Small dot that follows exactly -->
        <div
                bind:this={cursorInner}
                class="fixed top-0 left-0 w-1 h-1 bg-transparent rounded-full duration-100 ease-out will-change-transform opacity-50"
        ></div>
    </div>
{/if}

<style lang="postcss">
    .cursor-hover {
        @apply scale-125;
    }

    /* Improve performance */
    .will-change-transform {
        will-change: transform;
    }
</style>