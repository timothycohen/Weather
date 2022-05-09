<script>
  export let time;
  export let temp;
  export let icon;
  export let main;
  export let pop;
</script>

<div class="hourCard">
  <p class="hour__time">{time}</p>
  <div
    class="center-cropped"
    style="background-image: url('http://openweathermap.org/img/wn/{icon}@2x.png');"
    role="img"
    aria-label={main}
  />
  <p class="hour__pop">{pop}%</p>
  <p class="hour__temp">{temp}°</p>
</div>

<style>
  .hour__time {
    font-weight: bolder;
    font-size: 1rem;
  }

  .hour__temp {
    font-size: 1.1rem;
  }

  * {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .hourCard {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-items: flex-start;
    height: 6.7rem;
    width: 3.6rem;
  }

  .center-cropped {
    background-size: 50px;
    width: 57px;
    height: 42px;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
