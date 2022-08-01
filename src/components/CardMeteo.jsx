import React, { useEffect, useState,} from 'react'
import axios from 'axios'
import Loading from './Loading'

const CardMeteo = ({ lat, lon,setIsLoading }) => {
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    if (lat) {
      const APIKey = '84339b5132d7e7d3d46aefa97d930c90'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
      axios.get(URL)
               .then(res => { 
        setWeather(res.data)
        setisLoading(false)
                const temp = {
          celsius:`${Math.round(res.data.main.temp -273.15)} °C`,
          farenheit:`${Math.round(res.data.main.temp -273.15)* 9/5 + 32} °F`
                  }
                  setTemperature(temp)
    })
    .catch((err) => console.log(err))
  }
  }, [lat, lon])
  const handelClic = () => setIsCelsius(!isCelsius)
 
  if(isLoading){
    return <Loading/>
  }else{


  return (
    <div>
      <article>
        <h1>Weather App</h1>
        <h2> {`${weather?.name} ${weather?.sys.country}`}</h2>
        <div>
          <img  src = {weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          <div>
            <h3>&#34;{weather?.weather[0].description}&#34;</h3>
            <ul>
            <li><span>Win Speed </span>{weather?.wind.speed} m/s</li>
            <li><span>Cloud </span>{weather?.clouds.all} %</li>
            <li><span>Presure </span>{weather?.main.pressure} hPa</li>

            </ul>
          </div>
        </div>
        <h2>{isCelsius? temperature?.celsius : temperature?.farenheit}</h2>
        <button onClick={handelClic}>{isCelsius ?'Change to °F':'Change to °C'}</button>
      </article>
        
    </div>
  )
}
}
export default CardMeteo
