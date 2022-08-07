import { useEffect, useState } from 'react'
import Loading from './components/Loading'
import './App.css'
import CardMeteo from './components/CardMeteo'

function App() {
  const [coords, setCoords] = useState()
  
useEffect ( () =>  {
 const success = pos =>{
 const latlon={
 lat:pos.coords.latitude ,
 lon:pos.coords.longitude
}
setCoords(latlon)
 }
 navigator.geolocation.getCurrentPosition(success)
} , [])

  return (
    <div className="App">
    
    <CardMeteo  lon={coords?.lon} lat={coords?.lat} />
   <img className='img' src='./img/clima1.jpg' alt="" />
    </div>

  )
}

export default App
