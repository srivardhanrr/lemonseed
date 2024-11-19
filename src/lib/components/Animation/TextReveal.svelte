<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    export let text: string;
    export let className = '';

    let gsap: any;
    let letters: HTMLSpanElement[] = [];
    let container: HTMLDivElement;

    onMount(async () => {
        if (browser) {
            const gsapModule = await import('gsap');
            gsap = gsapModule.gsap;

            setupAnimation();
        }
    });

    function setupAnimation() {
        if (!gsap || !letters.length) return;

        gsap.set(letters, {
            opacity: 0,
            y: 50,
            rotateX: -90
        });

        gsap.to(letters, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.5
        });
    }

    $: words = text.split(' ');
</script>

<div bind:this={container} class="perspective flex flex-wrap {className}">
    {#each words as word, wordIndex}
        <span class="whitespace-nowrap">
            {#each word.split('') as char, charIndex}
                <span
                        bind:this={letters[wordIndex * word.length + charIndex]}
                        class="inline-block"
                        style="transform-origin: 50% 50% -10px"
                >
                    {char}
                </span>
            {/each}
            {#if wordIndex !== words.length - 1}
                <span class="inline-block">&nbsp;</span>
            {/if}
        </span>
    {/each}
</div>

<style>
    .perspective {
        perspective: 1000px;
    }
</style>