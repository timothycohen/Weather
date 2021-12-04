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
  onMount(() => ready = true);

</script>

{#if ready}
<main transition:fade>
  <div class="header"><Header /></div>

  <div class="content">
    <div class="current"><Current /></div>
    <div class="daily"><Daily /></div>
    <Hourly />
    <HourlyTempChart />
    <Sun />
  </div>
</main>
{/if}

<style>
.header{
  margin: 1rem;
}

.content{
  background-image: url('https://images.unsplash.com/photo-1608789433796-73a21e987a66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80');
  background-size: cover;
  width: 100%;
  margin: 0;
  padding: 1rem 0;
}

.current{
  max-width: 48rem;
  margin: 0 auto;
}

</style>
