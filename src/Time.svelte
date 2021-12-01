<script>
import { weather } from './stores';

$: sunrise = getForeignTime($weather.timezone/60, new Date($weather.sys.sunrise*1000))
$: sunset = getForeignTime($weather.timezone/60, new Date($weather.sys.sunset*1000))
$: time = getForeignTime($weather.timezone/60, new Date())

function getForeignTime(foreignTZOffsetInMinutes, desiredTime) {
  let localeTZOffsetInMinutes = (new Date()).getTimezoneOffset();
  let offsetInMs = 60*1000*(foreignTZOffsetInMinutes+localeTZOffsetInMinutes)
  let foreignTime = new Date(desiredTime.getTime() + offsetInMs)
  let formatter = new Intl.DateTimeFormat([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  return time = formatter.format(foreignTime);
}


// NOTIMPLEMENTED:
// stretch the daylight hours between the width above the horizontal line
// plot automatically

export function plot() {
  // initialize and clear canvas
  const canvas = document.querySelector("canvas");
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


<p>
  {time}
</p>

<canvas width="500" height="100" on:mount={plot()}></canvas>

<p>sunrise {sunrise}</p>
<p>sunset {sunset}</p>
