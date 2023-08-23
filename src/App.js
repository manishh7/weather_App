import hotbg from "./assets/hot.jpg";
import coldbg from "./assets/cold.jpg";
import Descriptions from "./componets/Descriptions";
import { useEffect, useState } from "react";
import { getDATA } from "./componets/weather";
function App() {
  const [city, setCity] = useState('paris');
  const [weather, setweather] = useState(null);
  const [units, setUnits] = useState("imperial")
  const [bg,setBg] = useState(hotbg);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDATA(city, units);
      setweather(data);

      //dyanamic

      const threshold =units ==='metric'?20:60;
      if(data.temp <= threshold) setBg(coldbg);
      else setBg(hotbg);
    };
    fetchData();
  }, [units,city]);

  const handleUnitsClick =(e)=>{
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit==="C";
    button.innerText =isCelsius ? "*F" :"*C"
    setUnits(isCelsius?"metric":"imperial")
  };

  const enterKeyPressed =(e) =>{
    if(e.keyCode===13){
      setCity(e.currentTarget.value);
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section_inputs">
              <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter city" />
              <button onClick={(e)=>handleUnitsClick(e)}>*F</button>
            </div>
            <div className="section section_temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather icon" />
                <h3>{weather.description}</h3>

              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} *${units === "metric" ? "C" : "F"}`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
