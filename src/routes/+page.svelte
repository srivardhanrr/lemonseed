<script lang="ts">
import Home from "$lib/components/Home/Hero.svelte";
import Services from "$lib/components/Home/Services.svelte";
import HowWeWork from "$lib/components/Home/HowWeWork.svelte";
import OfferedServices from "$lib/components/Home/OfferedServices.svelte";
import FeaturedProjects from "$lib/components/Home/FeaturedProjects.svelte";
import ContactSection from "$lib/components/Home/ContactSection.svelte";
</script>

<div>
    <Home />
<!--    <Services />-->
    <OfferedServices />
    <HowWeWork />
    <FeaturedProjects />
    <ContactSection />
</div>