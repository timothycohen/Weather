<script>
  import Header from './Header.svelte';
  import Current from './Current.svelte';
  import Sun from './Sun.svelte';
  import Hourly from './Hourly.svelte';
  import HourlyTempChart from './HourlyTempChart.svelte';
  import Daily from './Daily.svelte';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let ready = false;
  onMount(() => (ready = true));
</script>

{#if ready}
  <main transition:fade>
    <Header />

    <div class="current"><Current /></div>
    <Daily />
    <Hourly />
    <HourlyTempChart />
    <Sun />
  </main>
{/if}

<style>
  .current {
    max-width: 48rem;
    margin: 0 auto;
  }
</style>
