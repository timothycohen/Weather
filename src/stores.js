import { writable } from 'svelte/store';
import { config } from '../config';

export const weather = writable(
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
