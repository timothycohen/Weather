import { writable } from 'svelte/store';
import { config } from '../config';

export const unit = writable( localStorage.getItem('unit') || 'imperial' );
unit.subscribe((choice) => { localStorage.setItem('unit', choice); });

export const APPID = config.OPEN_WEATHER_API_KEY;

export const K = degK => {
  // celsius
  const metric = (() => Math.round(degK - 273.15))()
  // fahrenheit
  const imperial = (() => Math.round((degK - 273.15) * 9/5 + 32))()
  // kelvin
  const K = Math.round(degK)

  return {
    K, metric, imperial,
  }
}

export const metersPerSec = mps => {
  // kph
  const metric = (() => Math.round(mps*60*60/1000))()
  // mph
  const imperial = (() => Math.round(mps*2.23694))()
  // meters per second
  mps = Math.round(mps);

  return {
    metric, imperial, mps,
  }
}

export function getForeignTime(foreignTZOffsetInMinutes, desiredTime) {
  let localeTZOffsetInMinutes = (new Date()).getTimezoneOffset();
  let offsetInMs = 60*1000*(foreignTZOffsetInMinutes+localeTZOffsetInMinutes)
  let foreignTime = new Date(desiredTime.getTime() + offsetInMs)
  let formatter = new Intl.DateTimeFormat([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  return formatter.format(foreignTime);
}

export const current = writable(
  {
    "coord": {
        "lon": -74.006,
        "lat": 40.7143
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 277.24,
        "feels_like": 277.24,
        "temp_min": 274.23,
        "temp_max": 279.23,
        "pressure": 1015,
        "humidity": 66
    },
    "visibility": 10000,
    "wind": {
        "speed": 0.45,
        "deg": 349,
        "gust": 1.34
    },
    "clouds": {
        "all": 75
    },
    "dt": 1638324124,
    "sys": {
        "type": 2,
        "id": 2039034,
        "country": "US",
        "sunrise": 1638273608,
        "sunset": 1638307792
    },
    "timezone": -18000,
    "id": 5128581,
    "name": "New York",
    "cod": 200
  }
)

export const daily = writable(
  [
    {
      "dt": 1638460800,
      "temp_min": 279.71,
      "temp_max": 286.25,
      "main": "Rain",
      "description": "light rain",
      "icon": "10d"
    },
    {
      "dt": 1638547200,
      "temp_min": 275.93,
      "temp_max": 283.44,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    },
    {
      "dt": 1638633600,
      "temp_min": 275.32,
      "temp_max": 280.85,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    },
    {
      "dt": 1638720000,
      "temp_min": 276,
      "temp_max": 284.79,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    },
    {
      "dt": 1638806400,
      "temp_min": 277.17,
      "temp_max": 291.5,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    },
    {
      "dt": 1638892800,
      "temp_min": 275.33,
      "temp_max": 278.26,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ]
)

export const hourly = writable(
  [
    {
      "dt": 1638392400,
      "temp": 281.97,
      "main": "Clouds",
      "icon": "02d",
      "pop": 0,
    },
    {
      "dt": 1638396000,
      "temp": 281.54,
      "main": "Clouds",
      "icon": "03n",
      "pop": 0,
    },
    {
      "dt": 1638399600,
      "temp": 281.1,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0,
    },
    {
      "dt": 1638403200,
      "temp": 280.6,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0,
    },
    {
      "dt": 1638406800,
      "temp": 280.19,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0,
    },
    {
      "dt": 1638410400,
      "temp": 280.31,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0.2,
    },
    {
      "dt": 1638414000,
      "temp": 280.43,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0.45,
    },
    {
      "dt": 1638417600,
      "temp": 280.54,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0.7,
    },
    {
      "dt": 1638421200,
      "temp": 279.77,
      "main": "Rain",
      "icon": "10n",
      "pop": 0.85,
    },
    {
      "dt": 1638424800,
      "temp": 279.71,
      "main": "Rain",
      "icon": "10n",
      "pop": 0.91,
    },
    {
      "dt": 1638428400,
      "temp": 280.57,
      "main": "Rain",
      "icon": "10n",
      "pop": 0.4,
    },
    {
      "dt": 1638432000,
      "temp": 281.48,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0.22,
    },
    {
      "dt": 1638435600,
      "temp": 282.65,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0.04,
    },
    {
      "dt": 1638439200,
      "temp": 282.92,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0,
    },
    {
      "dt": 1638442800,
      "temp": 282.62,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0,
    },
    {
      "dt": 1638446400,
      "temp": 282.43,
      "main": "Clouds",
      "icon": "04n",
      "pop": 0,
    },
    {
      "dt": 1638450000,
      "temp": 282.4,
      "main": "Clouds",
      "icon": "04d",
      "pop": 0,
    },
    {
      "dt": 1638453600,
      "temp": 283.01,
      "main": "Clouds",
      "icon": "04d",
      "pop": 0,
    },
    {
      "dt": 1638457200,
      "temp": 283.8,
      "main": "Clouds",
      "icon": "04d",
      "pop": 0,
    },
    {
      "dt": 1638460800,
      "temp": 284.65,
      "main": "Clouds",
      "icon": "04d",
      "pop": 0,
    },
    {
      "dt": 1638464400,
      "temp": 284.99,
      "main": "Clouds",
      "icon": "04d",
      "pop": 0,
    },
    {
      "dt": 1638468000,
      "temp": 284.95,
      "main": "Clouds",
      "icon": "04d",
      "pop": 0,
    },
    {
      "dt": 1638471600,
      "temp": 285.23,
      "main": "Clouds",
      "icon": "04d",
      "pop": 0,
    },
    {
      "dt": 1638475200,
      "temp": 285.58,
      "main": "Clouds",
      "icon": "04d",
      "pop": 0,
    }
  ]
)

export function getForeignDate(foreignTZOffsetInMinutes, desiredTime) {
  let localeTZOffsetInMinutes = (new Date()).getTimezoneOffset();
  let offsetInMs = 60*1000*(foreignTZOffsetInMinutes+localeTZOffsetInMinutes)
  let foreignTime = new Date(desiredTime.getTime() + offsetInMs)
  let formatter = new Intl.DateTimeFormat([], {
    day: 'numeric',
    weekday: 'short',
    month: 'short',
  });
  return formatter.format(foreignTime);
}
