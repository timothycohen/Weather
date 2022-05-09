<script>
  import { current, hourly, getForeignTime, K, unit } from './stores';
  import HourCard from './HourCard.svelte';
  import { onMount } from 'svelte';

  // if scrolled to the right, take off the shadow on .hoursList:after
  onMount(() => {
    const list = document.querySelector('.hoursList');
    const shadow = document.querySelector('.shadow');
    list.addEventListener('scroll', () => {
      shadow.style.opacity = 1;
      if (list.scrollLeft) shadow.style.opacity = 0;
    });
  });
</script>

<div class="hoursList">
  {#each $hourly as hour}
    <HourCard
      time={getForeignTime($current.timezone / 60, new Date(hour.dt * 1000))}
      temp={K(hour.temp)[$unit]}
      icon={hour.icon}
      main={hour.main}
      pop={Math.round(100 * hour.pop)}
    />
  {/each}
  <span class="shadow" />
</div>

<style>
  .hoursList {
    width: 95%;
    position: relative;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    margin: 1rem auto;
    padding: 0;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 2px 2px var(--color__darkgray);
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 0 0 4px 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 0 0 4px 4px;
  }
  .hoursList:hover::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    box-shadow: inset 0 0 5px grey;
  }
  .hoursList:hover::-webkit-scrollbar-thumb {
    background-color: #888;
  }
  .hoursList:hover::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  .shadow {
    position: absolute;
    z-index: 1;
    bottom: 0rem;
    right: 0rem;
    border-radius: 4px;
    pointer-events: none;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 100%);
    width: 5rem;
    height: 7rem; /* unfortunately it doesn't overflow the scroll bar */
  }

  .hoursList:hover .shadow {
    opacity: 0;
  }
</style>
