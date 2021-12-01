<script>
  import { current, hourly, getForeignTime, K, unit } from './stores';
  import HourCard from './HourCard.svelte';
</script>

<div class="hoursList">
  {#each $hourly as hour}
    <HourCard
      time = {getForeignTime($current.timezone/60, new Date(hour.dt*1000))}
      temp = {K(hour.temp)[$unit]}
      icon = {hour.icon}
      main = {hour.main}
      pop = {Math.round(100*hour.pop)}
    />
  {/each}
</div>


<style>
.hoursList{
  display: flex;
  align-items: center;
  overflow-x: scroll;
}
</style>