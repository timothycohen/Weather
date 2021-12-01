<script>
  import { current, K, unit, metersPerSec, getForeignTime, getForeignDate} from './stores';

  $: name = $current.name
  $: temp = K($current.main.temp)[$unit]
  $: feelsLike = K($current.main.feels_like)[$unit]
  $: low = K($current.main.temp_min)[$unit]
  $: high = K($current.main.temp_max)[$unit]
  $: humidity = $current.main.humidity
  $: description = $current.weather[0].description
  $: main = $current.weather[0].main
  $: clouds = $current.clouds.all
  $: windspeed = metersPerSec($current.wind.speed)[$unit]
  $: icon = $current.weather[0].icon
  $: tempLabel = $unit === 'imperial' ? 'F' : 'C';
  $: speedLabel = $unit === 'imperial' ? 'mph' : 'kph';
  $: foreignTime = getForeignTime($current.timezone/60, new Date());
  $: foreignDate = getForeignDate($current.timezone/60, new Date());

</script>

<div class="current">
  <div class="current__city">{name}</div>
  <div class="dateTime">{foreignTime} {foreignDate}</div>
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
    <img class="tooltip" src="http://openweathermap.org/img/wn/{icon}@2x.png" alt="{main}">
    <span class="tooltiptext">{main}</span>
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
