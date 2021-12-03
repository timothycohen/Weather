<script>
import { current, getForeignTime, colorStore } from './stores';
import { onMount } from 'svelte';

// font size was causing time to sunrise/set text to wrap on mobile, reducing font size if it's wrapping
onMount(() => {
  const p1 = document.querySelector('.sunrise > .timeTo')
  let p1Height = window.getComputedStyle(p1).height.replace('px', '');
  const p2 = document.querySelector('.sunset > .timeTo')
  let p2Height = window.getComputedStyle(p2).height.replace('px', '');

  if (p1Height > 20){
    document.querySelector('.sunrise > .timeTo > .data').style.fontSize = '.5rem';
  }
  if (p2Height > 20){
    document.querySelector('.sunset > .timeTo > .data').style.fontSize = '.5rem';
  }
})

let canvas;

$: sunrise = getForeignTime($current.timezone/60, new Date($current.sys.sunrise*1000))
$: sunset = getForeignTime($current.timezone/60, new Date($current.sys.sunset*1000))
$: foreignTime = getForeignTime($current.timezone/60, new Date())
$: sunriseMins = 60*sunrise.split(':')[0] + +sunrise.split(':')[1]
$: sunsetMins = 60*sunset.split(':')[0] + +sunset.split(':')[1]
$: foreignMins = 60*foreignTime.split(':')[0] + +foreignTime.split(':')[1]
$: { canvas && plot(foreignTime) }
let timeToSunrise;
let timeToSunset;
let nowColor = colorStore.colorNightLabel;

$: {
  if (sunriseMins && foreignMins && sunsetMins
  && foreignMins > sunriseMins
  && foreignMins < sunsetMins){
    nowColor = colorStore.colorSunLabel;
}
}

$: {
  if (sunriseMins && foreignMins){
    if (sunriseMins<foreignMins) { timeToSunrise = minsTo24(sunriseMins+1440-foreignMins) }
    else timeToSunrise = minsTo24(sunriseMins-foreignMins)
  }
}
$: {
  if (sunsetMins && foreignMins){
    if (sunsetMins<foreignMins) { timeToSunset = minsTo24(sunsetMins+1440-foreignMins) }
    else timeToSunset = minsTo24(sunsetMins-foreignMins)
  }
}


function minsTo24(mins) {
  let m = mins % 60
  let h = (mins - m) / 60
  if (h<10) h = '0' + h;
  if (m<10) m = '0' + m;
  h += 'hr'
  m += 'min'
  let answer = (h + ' ' + m)
  return answer
}

// NOTIMPLEMENTED
// I need to offset the dayNightDividingLine because the sun isn't highest at noon, but that's the highest point in my curve

function plot(time) {
  // initialize and clear canvas
  const ctx = canvas.getContext("2d");
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // set the look of the main curve
  const amplitudePerc = .99;
  const percentOfFull = 1;

  // draw main curve
  // as x is moving across the canvas, capture the y value where x shifts into daylight
  const dayLightPercent = (sunsetMins-sunriseMins)/1440;
  const xValueInPxWhereItBecomesDaylight = width/2 - dayLightPercent*width/2
  const xValueInPxWhereItBecomesNight = width/2 + dayLightPercent*width/2

  let dayNightDividingLine;

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.lineCap = 'round';
  let x = 0;
  let y;
  while (x < width) {
    y = height/2 + (amplitudePerc*height/2)*Math.cos(percentOfFull*x*2*Math.PI/500)
    if (x<xValueInPxWhereItBecomesDaylight) dayNightDividingLine = y;
    ctx.lineTo(x, y);
    x = x + 1;
  }
  ctx.stroke();


  // determine how much to fill in to reach foreign time
  let [hours, minutes] = time.split(':');
  minutes = parseInt(hours*60, 10) + parseInt(minutes, 10);
  let fillPerc = minutes/1440;

  // fill in day/night based on foreign time
  x = 0;
  while (x < width*fillPerc) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    y = height/2 + (amplitudePerc*height/2)*Math.cos(percentOfFull*x*2*Math.PI/500)
    if (y < dayNightDividingLine){
      ctx.strokeStyle = `${colorStore.colorSunLight}`;
    } else {
      ctx.strokeStyle = `${colorStore.colorNightDark}`;
    }
    ctx.moveTo(x, dayNightDividingLine)
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
  }

  // draw the horizontal line splitting day/night
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = colorStore.colorNightDark;
  ctx.moveTo(0, dayNightDividingLine);
  ctx.lineTo(xValueInPxWhereItBecomesDaylight, dayNightDividingLine);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = colorStore.colorSunLight;
  ctx.moveTo(xValueInPxWhereItBecomesDaylight, dayNightDividingLine);
  ctx.lineTo(xValueInPxWhereItBecomesNight, dayNightDividingLine);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = colorStore.colorNightDark;
  ctx.moveTo(xValueInPxWhereItBecomesNight, dayNightDividingLine);
  ctx.lineTo(width, dayNightDividingLine);
  ctx.stroke();

}

</script>

  <div class="details">

    <div class="sunrise" style="color:{colorStore.colorSunLabel};">
      <p class="time">
        <span class="label">sunrise</span>
        <span class="data">{sunrise}</span>
      </p>
      <p class="timeTo">
        <span class="label">in</span>
        <span class="data">{timeToSunrise}</span>
      </p>
    </div>

    <p class="now" style="color: {nowColor}">{foreignTime}</p>

    <div class="sunset" style="color:{colorStore.colorNightLabel};">
      <p class="time">
        <span class="label">sunset</span>
        <span class="data">{sunset}</span>
      </p>
      <p class="timeTo">
        <span class="label">in</span>
        <span class="data">{timeToSunset}</span>
      </p>
    </div>

  </div>

  <div class="canvasContainer">
    <canvas width="500" height="100" bind:this={canvas}></canvas>
  </div>

<style>

  *{
    margin: 0;
    padding: 0;
  }

  .canvasContainer{
    margin: 0 auto;
    text-align: center;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 2px 2px var(--color__darkgray);
  }

  .details{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 1rem auto .5rem auto;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 2px 2px var(--color__darkgray);
  }

  .timeTo > .data{
    font-size: .7rem;
  }

  .timeTo * {
    height: 1.2rem;
  }

  .now{
    font-size: 2rem;
    font-weight: 700;
  }

  .label{
    display: inline-block;
    width: 3rem;
  }
  .data{
    font-weight: bolder;
  }

  canvas, .canvasContainer, .details{ width: 300px; }

  @media only screen and (min-width: 500px) {
    canvas, .canvasContainer, .details{ width: 400px; }
    .timeTo > .data {font-size: 1rem; }
  }

  @media only screen and (min-width: 576px) {
    canvas, .canvasContainer, .details{ width: 500px; }
  }


</style>
