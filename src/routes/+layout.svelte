<script lang="ts">
    import '../app.css';
    import '@fontsource/inter/400.css';
    import '@fontsource/inter/500.css';
    import '@fontsource/inter/600.css';
    import '@fontsource/inter/700.css';
    import Header from "$lib/components/Header.svelte";
    import { browser } from '$app/environment'
    import { onMount, onDestroy } from 'svelte'
    import { initLenis, destroyLenis } from '$lib/lenis'
    import Cursor from "$lib/components/Cursor.svelte";

    onMount(() => {
        if (browser) {
            initLenis()
        }
    })

    onDestroy(() => {
        if (browser) {
            destroyLenis()
        }
    })

    let {children} = $props();
</script>

<div class="bg-black">
    <Cursor />
    <Header />
    <main>
        {@render children()}
    </main>
</div>


<!--<style lang="postcss">-->
<!--    :global(html) {-->
<!--        scroll-behavior: smooth;-->
<!--        height: 100%;-->
<!--        overflow-x: hidden;-->
<!--    }-->

<!--    :global(body) {-->
<!--        height: 100%;-->
<!--        overflow-x: hidden;-->
<!--        -webkit-font-smoothing: antialiased;-->
<!--        -moz-osx-font-smoothing: grayscale;-->
<!--    }-->

<!--    :global(*) {-->
<!--        -webkit-tap-highlight-color: transparent;-->
<!--    }-->

<!--    :global(::selection) {-->
<!--        background: rgba(255, 255, 255, 0.2);-->
<!--        color: #fff;-->
<!--    }-->
<!--</style>-->