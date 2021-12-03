<script>
  import { hourly, K, unit } from './stores';

  let width = 300;
  let wrapper = 350;

  function resize() {
    width = 300; wrapper = 350;
    if(window.innerWidth > 500 ) {
      width = 300; wrapper = 350;
    }
    if(window.innerWidth > 576 ) {
      width = 400; wrapper = 450;
    }
    if(window.innerWidth > 752 ) {
      width = 500; wrapper = 550;
    }
  }
  resize();
  window.onresize = resize;

</script>

<div class="wrapper" style="--wrapper:{wrapper}px; --width:{width}px">
  <label>Next 24 hours</label>
  <figure class="css-chart">
    <ul id="line-chart" class="line-chart">
      {#each $hourly as hour, i}
      <li style="--x: {6+ (width-12) * (i/23)}px; --y: {3*K(hour.temp)['metric']}px;">
        <div class="data-point" data-value="{5*K(hour.temp)[$unit]}"></div>
      </li>
      <li style="--x: {6+ (width-12) * (i/23)}px; --y: {3*K(hour.temp)['metric']}px;">
        <div class="label">{K(hour.temp)[$unit]}°</div>
      </li>
  {/each}
    </ul>
  </figure>
</div>

<style>

.wrapper{
  margin: 0;
  width: var(--wrapper);
  padding: 0 1rem 2.5rem 1rem;
  height: 150px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 2px 2px var(--color__darkgray);
}

label{
  font-weight: bolder;
}

.css-chart {
  border-bottom: 1px solid;
  display: inline-block;
  height: 100px;
  width: var(--width);
  padding: 0;
  margin: 0;
  position: relative;
}

.line-chart {
  list-style: none;
  margin: 0;
  padding: 0;
}

.data-point {
  background-color: white;
  border: 2px solid var(--color__lightblue);
  border-radius: 50%;
  bottom: calc(var(--y) - 8px);
  height: 12px;
  left: calc(var(--x) - 6px);
  position: absolute;
  width: 12px;
  z-index: 1;
}

.label {
  font-size: 12px;
  text-align: center;
  bottom: calc(var(--y) + 4px);
  left: calc(var(--x) - 6px);
  position: absolute;
  z-index: 1;
}

</style>
