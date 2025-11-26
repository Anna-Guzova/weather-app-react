import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState("");

  const url = `https://weather-backend-peach-one.vercel.app/api/weather?city=${town}`;

  const seachWeather = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setTown("");
    }
  };

  return (
    <div className="App">
      <div className="inp-field">
        <input
          type="text"
          value={town}
          onChange={(event) => setTown(event.target.value)}
          placeholder="Enter location"
          onKeyDown={seachWeather}
        ></input>
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
        </div>
        <div className="temp">
          {data.main ? <h1> {data.main.temp.toFixed()} °C</h1> : null}
        </div>
        <div className="desc">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>

      <div className="container">
        {data.name !== undefined && (
          <div className="footer">
            <div className="feels">
              <p>Feels like:</p>
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} °C</p>
              ) : null}
            </div>
            <div className="humidity">
              <p>Humidity:</p>
              {data.main ? (
                <p className="bold">{data.main.humidity} %</p>
              ) : null}
            </div>
            <div className="wind">
              <p>Wind:</p>
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} m/s</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
