<script>
  import { daily, current, getForeignDate, K, unit } from './stores';
  import DayCard from './DayCard.svelte';

</script>

<div class="dailyList">
  {#each $daily as day}
    <DayCard
      time = {getForeignDate($current.timezone/60, new Date(day.dt*1000))}
      min = {K(day.temp_min)[$unit]}
      max = {K(day.temp_max)[$unit]}
      main = {day.main}
      description = {day.description}
      icon = {day.icon}
    />
  {/each}
</div>

<style>
.dailyList{

}
</style>
