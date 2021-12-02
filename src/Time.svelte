<script>
import { current, getForeignTime } from './stores';

let canvas;

$: sunrise = getForeignTime($current.timezone/60, new Date($current.sys.sunrise*1000))
$: sunset = getForeignTime($current.timezone/60, new Date($current.sys.sunset*1000))
$: foreignTime = getForeignTime($current.timezone/60, new Date())
$: sunriseMins = 60*sunrise.split(':')[0] + +sunrise.split(':')[1]
$: sunsetMins = 60*sunset.split(':')[0] + +sunset.split(':')[1]
$: { canvas && plot(foreignTime) }

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
  const xValueInPxWhereItBecomesDayLight = width/2 - dayLightPercent*width/2

  let dayNightDividingLine;

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "gray";
  let x = 0;
  let y;
  while (x < width) {
    y = height/2 + (amplitudePerc*height/2)*Math.cos(percentOfFull*x*2*Math.PI/500)
    ctx.lineTo(x, y);
    if (x<xValueInPxWhereItBecomesDayLight) dayNightDividingLine = y;
    x = x + 1;
  }
  ctx.stroke();


  // determine how much to fill in
  let [hours, minutes] = time.split(':');
  minutes = parseInt(hours*60, 10) + parseInt(minutes, 10);
  let fillPerc = minutes/1440;

  // fill in day/night based on the time
  x = 0;
  while (x < width*fillPerc) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    y = height/2 + (amplitudePerc*height/2)*Math.cos(percentOfFull*x*2*Math.PI/500)
    if (y < dayNightDividingLine){
      ctx.strokeStyle = "yellow";
    } else {
      ctx.strokeStyle = "rgb(0,44,255)";
    }
    ctx.moveTo(x, dayNightDividingLine)
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
  }

  // draw the horizontal line splitting day/night
  x = 0;
  y = 0;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "gray";
  while (x < width){
    y = dayNightDividingLine;
    ctx.lineTo(x, y);
    x = x + 1;
  }
  ctx.stroke();

}

</script>

<canvas width="500" height="100" bind:this={canvas}></canvas>
<p>now {foreignTime}</p>
<p>sunrise {sunrise}</p>
<p>sunset {sunset}</p>
