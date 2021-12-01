<script>
import { current, getForeignTime } from './stores';

let canvas;

$: sunrise = getForeignTime($current.timezone/60, new Date($current.sys.sunrise*1000))
$: sunset = getForeignTime($current.timezone/60, new Date($current.sys.sunset*1000))
$: foreignTime = getForeignTime($current.timezone/60, new Date())
$: { canvas && plot(foreignTime) }

// NOTIMPLEMENTED:
// stretch the daylight hours between the width above the horizontal line


function plot(time) {
  // initialize and clear canvas
  const ctx = canvas.getContext("2d");
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // set the look of the main curve
  const amplitudePerc = .9;
  const percentOfFull = 1;
  const lineHeight = 3/4*height;

  // draw main curve
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "gray";
  let x = 0;
  let y;
  while (x < width) {
    y = height/2 + (amplitudePerc*height/2)*Math.cos(percentOfFull*x*2*Math.PI/500)
    ctx.lineTo(x, y);
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
    if (y < lineHeight){
      ctx.strokeStyle = "yellow";
    } else {
      ctx.strokeStyle = "rgb(0,44,255)";
    }
    ctx.moveTo(x, lineHeight)
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
    y = lineHeight;
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
