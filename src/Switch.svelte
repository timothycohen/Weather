<script>
  import { unit } from './stores';

  let color = "#2196F3";

  let checked = $unit === 'imperial' ? true : false;
  $: $unit = checked === true ? 'imperial' : 'metric';

</script>

  <label class="switch" style="--color:{color}">
    <input type="checkbox" bind:checked />
    <span class="slidingCover">
      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M15,13V5c0-1.66-1.34-3-3-3S9,3.34,9,5v8c-1.21,0.91-2,2.37-2,4c0,2.76,2.24,5,5,5s5-2.24,5-5C17,15.37,16.21,13.91,15,13 z M11,11V5c0-0.55,0.45-1,1-1s1,0.45,1,1v1h-1v1h1v1v1h-1v1h1v1H11z"/></g></g></svg>
    </span>
    <span class="slider">
      <span class="unit--1">°F</span>
      <span class="unit--2">°C</span>
    </span>
  </label>

<style>
  .switch {
    user-select: none;
    position: relative;
    display: inline-block;
    width: 3.5rem;
    height: 2rem;
    cursor: pointer;
    border: 1px solid var(--color);
    border-radius: 5px;
    box-shadow: 0 0 1px var(--color);
  }

  /* hidden checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* sliding cover */
  .slidingCover{
    z-index: 2;
    position: absolute;
    bottom: .175rem;
    left: .175rem;
    height: 1.65rem; /* 2-.175*2 */
    width: 1.4875rem; /* (3.5-.175*3)/2 */
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 10%;
  }

  svg{
    height: 1.65rem;
    width: 1.4875rem;
  }

  /* background */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  /* inner labels */
  .unit--1, .unit--2{
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1.3rem;
  }

  input:checked ~ .slidingCover {
    -webkit-transform: translateX(1.6625rem); /* 1.4875+.175 */
    -ms-transform: translateX(1.6625rem);
    transform: translateX(1.6625rem);
  }

</style>
