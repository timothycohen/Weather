<script>
  import { daily, current, getForeignDate, K, unit } from './stores';
  import DayCard from './DayCard.svelte';

</script>

<div class="daily">
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

.daily{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem auto 0 auto;
  width: 300px;
}

  @media only screen and (min-width: 376px) {
    .daily{ width: 350px;}
  }

  @media only screen and (min-width: 752px) {
    .daily{ width: 730px;}
  }

</style>
