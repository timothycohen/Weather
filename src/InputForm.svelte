<script>
  import { current, hourly, daily, APPID } from './stores';

  let city = '';
  let active = false;

  $: disabled = city.length === 0;

  async function getWeather() {
    active = false;
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APPID}`;
      let response = await fetch(url);
      if (response.status !== 200) {
        active = true;
        return Promise.resolve('not found');
      }
      city = '';
      $current = await response.json();
      getHourlyAndDaily();
    } catch (err) {
      console.log(err);
      return Promise.resolve('failed fetch');
    } finally {
    }
  }

  async function getHourlyAndDaily() {
    try {
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${$current.coord.lat}&lon=${$current.coord.lon}&exclude=current,minutely,alerts&appid=${APPID}`;
      let response = await fetch(url);
      if (response.status !== 200) return Promise.resolve('not found');
      let data = await response.json();
      formatHourly(data.hourly);
      formatDaily(data.daily);
    } catch (err) {
      console.log(err);
      return Promise.resolve('failed fetch');
    } finally {
    }
  }

  function formatHourly(data) {
    let hourlyData = [];
    for (let i = 1; i < 25; i++) {
      let hour = {};
      hour['dt'] = data[i].dt;
      hour['temp'] = data[i].temp;
      hour['main'] = data[i].weather[0].main;
      hour['icon'] = data[i].weather[0].icon;
      hour['pop'] = data[i].pop;
      hourlyData.push(hour);
    }
    $hourly = hourlyData;
  }

  function formatDaily(data) {
    let dailyData = [];
    for (let i = 1; i < 7; i++) {
      let day = {};
      day['dt'] = data[i].dt;
      day['temp_min'] = data[i].temp.min;
      day['temp_max'] = data[i].temp.max;
      day['main'] = data[i].weather[0].main;
      day['description'] = data[i].weather[0].description;
      day['icon'] = data[i].weather[0].icon;
      dailyData.push(day);
    }
    $daily = dailyData;
  }

  async function handleSubmit() {
    let weather = await getWeather();
    if (weather === 'failed fetch' || weather === 'not found') {
      console.log(weather);
    } else {
    }
  }

  city = 'New York';
  getWeather();
  city = '';
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input
    id="inputCity"
    type="text"
    placeholder="Enter a city"
    class="floating__input"
    bind:value={city}
    autocomplete="off"
  />
  <label for="inputCity" data-content="Enter a city" class="floating__label">
    <span class="error" class:active>⚠ Not found</span>
    <button type="submit" class="img--search" id="submitBtn" {disabled}>
      <img src="icons/icons8-search-50.png" alt="search icon" />
    </button>
    <img class="img--marker" src="icons/icons8-marker-sun-50.png" alt="marker icon" />
    <span class="hidden--visually">Enter a city</span>
  </label>
</form>

<style>
  /* CSS Adapted From: https://dev.to/adrianbdesigns/let-s-create-a-floating-label-input-with-html-and-css-only-4mo8 */

  form {
    margin: auto 0 0 0;
    width: 12rem;
    min-width: 6rem;
  }

  /* main input */
  .floating__input {
    padding: 1.2rem 2.9rem 0.5rem 0.5rem;
    font-size: 1rem;
    border: none;
    outline: none;
    border-bottom: 0.0625rem solid var(--color__darkgray);
    transition: border-color 0.2s ease;
    caret-color: var(--color__accent);
    background: none;
    display: block;
    width: 100%;
  }

  /* default placeholder hidden */
  .floating__input::placeholder {
    color: rgba(0, 0, 0, 0);
  }

  /* set up positioning for the custom underline */
  .floating__label {
    display: block;
    position: relative;
    max-height: 0;
    font-weight: 500;
  }

  /* hidden custom underline */
  .floating__label::after {
    content: '';
    height: 0.1rem;
    position: absolute;
    transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.3s ease;
    opacity: 0;
    left: 0;
    top: 100%;
    margin-top: -0.1rem;
    transform: scale3d(0, 1, 1);
    width: 100%;
    background-color: var(--color__accent);
  }

  /* show underline on focus */
  .floating__input:focus + .floating__label::after {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }

  /* custom placeholder unfocused */
  .floating__label::before {
    color: var(--color__accent);
    content: attr(data-content);
    display: inline-block;
    filter: blur(0);
    backface-visibility: hidden;
    transform-origin: left top;
    transition: transform 0.2s ease;
    left: 0.5rem; /* match to text input padding */
    position: relative;
    cursor: text;
    /* custom placeholder at the top by default */
    transform: translate3d(0, -3rem, 0) scale3d(0.82, 0.82, 1);
  }

  /* custom placeholder is only at the bottom when there's no focus or content */
  .floating__input:placeholder-shown:not(:focus) + .floating__label::before {
    transform: translate3d(0, -1.6rem, 0) scale3d(1, 1, 1);
    color: var(--label__color);
  }

  /* hidden label */
  .hidden--visually {
    border: 0;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .error {
    opacity: 0;
    color: red;
    position: absolute;
    right: 0.5rem;
  }

  .active {
    opacity: 1;
  }

  button {
    border: none;
    padding: 0;
    margin: 0;
    text-decoration: none;
    background: transparent;
    color: #ffffff;
    text-align: center;

    position: absolute;
    bottom: 0.5rem;
    right: 1.3rem;
    width: 1.3rem;
    height: 1.3rem;

    z-index: 5;
  }

  .img--marker {
    position: absolute;
    bottom: 0.5rem;
    right: 0;
    width: 1.3rem;
  }

  .img--search > img {
    width: 1.3rem;
    cursor: pointer;
    opacity: 1;
    transition: 300ms ease-in-out;
  }

  button:not(:disabled):hover {
    transform: scale(1.1);
  }

  button:disabled > img {
    opacity: 0.3;
  }
</style>
