<script>
  import InputForm from "./InputForm.svelte";
  import Switch from './Switch.svelte'
  import MainDisplay from './MainDisplay.svelte'
  import Time from './Time.svelte'
	import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let ready = false;
  onMount(() => ready = true);

</script>

{#if ready}
<main transition:fade>
  <div class="header">
    <InputForm />
    <Switch />
  </div>
  <section class='today'>
    <MainDisplay />
  </section>
  <Time />
</main>
{/if}

<style>

main{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.header{
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.today{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>
