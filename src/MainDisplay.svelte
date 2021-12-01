<script>
  import { weather, K, unit, metersPerSec } from './stores';

  $: name = $weather.name
  $: temp = K($weather.main.temp)[$unit]
  $: feelsLike = K($weather.main.feels_like)[$unit]
  $: low = K($weather.main.temp_min)[$unit]
  $: high = K($weather.main.temp_max)[$unit]
  $: humidity = $weather.main.humidity
  $: description = $weather.weather[0].description
  $: clouds = $weather.clouds.all
  $: windspeed = metersPerSec($weather.wind.speed)[$unit]
  $: icon = $weather.weather[0].icon
  $: tempLabel = $unit === 'imperial' ? 'F' : 'C';
  $: speedLabel = $unit === 'imperial' ? 'mph' : 'kph';

</script>

<div class="current">
  <div class="current__city">{name}</div>
  <div class="current__overview">
    <div class="overview__head">
      <div class="head--high">high {high}°	↑</div>
      <div class="head--low">low {low}° ↓</div>
    </div>
    <div class="overview__temperature">{temp}°{tempLabel}</div>

    <div class="overview__feelsLike">Feels Like: {feelsLike}°</div>

    <div class="overview__humidity">humidity: {humidity}%</div>
    <div class="overview__windspeed">wind: {windspeed}{speedLabel}</div>
    <div class="overview__clouds">clouds: {clouds}%</div>
  </div>

  <div class='current__visual'>
    <img src="http://openweathermap.org/img/wn/{icon}@2x.png" alt="cloudy">
    <div class="current--description">{description}</div>
  </div>
</div>


<style>
  .current__city{
    width: 100%;
    text-align:center;
    font-size: 3rem;
  }

  .overview__head{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .overview__temperature{
    font-size: 5rem;
  }

  .current{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }

</style>
