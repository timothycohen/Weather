<script>
  import { hourly, K, unit } from './stores';

  let width = 300;
  let wrapper = 350;
  let pointSize = 8;

  function resize() {
    width = 300;
    wrapper = 350;
    pointSize = 8;
    if (window.innerWidth > 500) {
      width = 300;
      wrapper = 350;
      pointSize = 9;
    }
    if (window.innerWidth > 576) {
      width = 400;
      wrapper = 450;
      pointSize = 10;
    }
    if (window.innerWidth > 752) {
      width = 500;
      wrapper = 550;
      pointSize = 12;
    }
  }

  resize();
  window.onresize = resize;
</script>

<div class="wrapper" style="--wrapper:{wrapper}px; --width:{width}px; --pointSize:{pointSize}px">
  <div class="title">Next 24 hours</div>
  <figure class="css-chart">
    <ul id="line-chart" class="line-chart">
      {#each $hourly as hour, i}
        <li style="--x: {pointSize / 2 + (width - pointSize) * (i / 23)}px; --y: {3 * K(hour.temp)['metric']}px;">
          <div class="data-point" data-value={5 * K(hour.temp)[$unit]} />
        </li>
        <li style="--x: {pointSize / 2 + (width - pointSize) * (i / 23)}px; --y: {3 * K(hour.temp)['metric']}px;">
          <div class="label">{K(hour.temp)[$unit]}°</div>
        </li>
      {/each}
    </ul>
  </figure>
</div>

<style>
  .wrapper {
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

  .title {
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
    height: var(--pointSize);
    left: calc(var(--x) - var(--pointSize) / 2);
    position: absolute;
    width: var(--pointSize);
    z-index: 1;
  }

  .label {
    font-size: var(--pointSize);
    text-align: center;
    bottom: calc(var(--y) - 8px + var(--pointSize));
    left: calc(var(--x) - var(--pointSize) / 2);
    position: absolute;
    z-index: 1;
  }
</style>
