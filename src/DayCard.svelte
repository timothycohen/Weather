<script>
  export let time;
  export let min;
  export let max;
  export let main;
  export let description;
  export let icon;

</script>
<div class="dayCard">
  <p class="day__time">{time}</p>
    <div class="center-cropped"
      style="background-image: url('http://openweathermap.org/img/wn/{icon}@2x.png');"
      role="img" aria-label="{main}"
    ></div>
    <p class="day__description">{description}</p>
    <div class="day__temp">
      <span class="day__temp--max">{max}°↑</span>
      <span class="day__temp--min">{min}°↓</span>
    </div>
</div>

<style>
  *{
    margin: 0;
    padding: 0;
    text-align: center;
  }
  .dayCard{
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 2px 2px var(--color__darkgray);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6.5rem;
  }
  .day__time{
    font-weight: bolder;
    font-size: 1rem;
  }
  .day__temp--min{
    font-size: .7rem;
  }
  .day__temp--max{
    font-size: 1.1rem;
  }
  .center-cropped {
    width: 76px;
    height: 56px;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
