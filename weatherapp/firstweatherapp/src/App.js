import cold from './assets/cold.jpeg'
import hot from './assets/warm.jpeg'
import Descriptions from './components/Descriptions';
import { useEffect, useState } from "react";
import { getFormatedWeatherData } from "./weatherService";


function App() {

  const [city, setCity] = useState('Los angeles')
  const [bgImg, setBgImg] = useState('hot')
  const [weather, setWeather] = useState(null)
  const [units, setUnits] =useState('metric')

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormatedWeatherData(city, units)
      setWeather(data);

      // Dynamic Backround
      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) 
        setBgImg(cold) 
        else {
          setBgImg(hot)
        }
    } 

    fetchWeatherData();
  }, [units, city])

  const handleUnitsClick = (e) => {
    const button = e.target;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  }
  
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.target.value);
      e.target.blur();
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className='overlay'>
        {
          weather && (
            <div className='container'>
            <div className='section section__inputs'>
              <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter City...' />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className='section section__temperature'>
              <div className='description'>
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img
                  src={weather.iconURL}
                  alt='weatherIcon' />
                <h3>{weather.description}</h3>
              </div>
              <div className='temperature'>
                <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
            </div>
            {/* bottom description */}
            <Descriptions weather={weather} units={units}/>
          </div>  
          )
        }
      </div>
    </div>
  );
}

export default App;
