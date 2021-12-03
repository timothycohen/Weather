<script>
  import { current, K, unit, metersPerSec} from './stores';

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


</script>

<div class="current">

  <div class='current__visual'>
    <img class="visual--image" src="http://openweathermap.org/img/wn/{icon}@2x.png" alt={main}>
    <div class="visual--description">{description}</div>
  </div>

  <div class="current__overview">
    <div class="overview__head">
      <div class="head--high">high {high}°	↑</div>
      <div class="head--low">low {low}° ↓</div>
    </div>
    <div class="overview__temperature">{temp}°<span class="tempLabel">{tempLabel}</span></div>
  </div>

  <div class="current__details">

    <div class="detailContainer--temp">
      <img src="icons/icons8-thermometer-50.png" alt="thermometer icon" />
      <div>
        <p class="overview__feelsLike--label">Feels Like</p>
        <p class="overview__feelsLike--data">{feelsLike}°</p>
      </div>
    </div>

    <div class="detailContainer--moisture">
      <img src="icons/icons8-moisture-50.png" alt="moisture icon" />
      <div>
        <p class="overview__humidity--label">Humidity</p>
        <p class="overview__humidity--data">{humidity}%</p>
      </div>
    </div>

    <div class="detailContainer--wind">
      <img src="icons/icons8-wind-50.png" alt="wind icon" />
      <div>
        <p class="overview__windspeed--label">Wind</p>
        <p class="overview__windspeed--data">{windspeed}{speedLabel}</p>
      </div>
    </div>

    <div class="detailContainer--clouds">
      <img src="icons/icons8-partly-cloudy-day-50.png" alt="clouds icon" />
      <div>
        <p class="overview__clouds--label">Clouds</p>
        <p class="overview__clouds--data">{clouds}%</p>
      </div>
    </div>
  </div>

</div>



<style>

  *{
    margin: 0;
    padding: 0;
  }

  .current{
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-around;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 2px 2px var(--color__darkgray);
  }

  .current > div{
    margin: 1rem 0;
  }

/* #################### VISUAL ####################*/
  .current__visual{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .visual--image{
    object-fit: none;
    width: 75px;
    height: 60px;
  }

  .visual--description{
    font-weight: bolder;
    font-size: 2rem;
    line-height: 1.5rem;
    text-align: center;
    width: 12.5rem;
  }

/* #################### OVERVIEW ####################*/

  .current__overview{
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
    width: 9rem;
}

  .overview__head{
    display: flex;
    align-items: flex-end;
    width: 100%;
    justify-content: space-around;
    font-size: .9rem;
  }

  .head--high{
    font-size: larger;
  }

  .overview__temperature{
    font-size: 5rem;
    line-height: 3rem;
  }

  .tempLabel{
    position: relative;
    top: -1.2rem;
    font-size: 3rem;
  }

/* #################### DETAILS ####################*/
  .current__details{
    display: grid;
    grid-template-columns: 6.5rem 6.5rem;
    grid-template-rows: 2.5rem 2.5rem;
    grid-row-gap: .5rem;
    grid-column-gap: .5rem;
  }

  [class^="detailContainer--"], [class*=' detailContainer--']{
    display: flex;
    align-items: flex-end;
  }

  [class^="detailContainer--"] img, [class*=' detailContainer--'] img{
    height: 2rem;
    width: 2rem;
  }

  [class^="detailContainer--"] p, [class*=' detailContainer--'] p{
  }

  /* p[class$="--data"] isn't working... */
  .overview__humidity--data,
  .overview__feelsLike--data,
  .overview__windspeed--data,
  .overview__clouds--data{
    font-weight: bolder;
    font-size: 1.5rem;
    line-height: 1rem;
  }

</style>
