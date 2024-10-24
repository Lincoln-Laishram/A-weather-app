import { IoIosSunny, IoMdCloudy } from "react-icons/io";
import { FaCloudRain, FaRegSnowflake, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("imphal");
  const [search, setSearch] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [temp,setTemp] = useState("");
  const [icon, setIcon] = useState(null);
  const API = "4f183bdc6fe8d641a74b0e379f82e1ad";

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const weatherMain = data.weather[0].main;
      setDescription(data.weather[0].description);
      setError(null); 
      setIcon(getWeatherIcon(weatherMain));
      setTemp(Math.round(data.main.temp - 273.15)); 
    } catch (error) {
      setError("Error fetching weather data."+"Either city name doesn't exist or server error."+"😢");
      setDescription("");
      setTemp("");
      setIcon(null); 
      console.error("Error:", error);
    }
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return <IoIosSunny size={100} className="sunny"/>;
      case "Clouds":
        return <IoMdCloudy size={100} className="cloudy"/>;
      case "Rain":
        return <FaCloudRain size={100} className="rain"/>;
      case "Snow":
        return <FaRegSnowflake size={100}/>;
      default:
        return <IoMdCloudy size={100} className="cloudy"/>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      setError("City name cannot be empty.");
    } else {
      setCity(search.trim()); 
      setError(null); 
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn">
          <FaSearch />
        </button>
      </form>
      <br />
      {error && <div className="error">{error}</div>}

      {!error && (
        <> <br />
          <h1>{icon}</h1>
          <h1 className="temp">{city.toUpperCase()} &nbsp; <i>{temp}°C</i></h1>
          <h1 className="description">{description.toUpperCase()}</h1>
        </>
      )}
    </div>  
    </>
  );
}

export default App;
