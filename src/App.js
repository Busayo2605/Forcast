import { useEffect, useState } from "react";
// import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Loader from "./component/Loader";
export const ApiKey = "b89655160686117d41828ef26e9463d0";

function App() {
  const [loading, setloading] = useState(true);
  const [details, setdeatails] = useState({
    name: "",
    country: "",
    description: "",
    temp: "",
    icon: "",
    class: "",
  });
  const [Weeklydetails, setweeklydeatails] = useState([]);
  const [error, seterror] = useState("");
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitute = position.coords.longitude;
      try {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitute}&appid=${ApiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.cod === 400) {
              seterror("NO CITY FOUND......");
            } else {
            }
            setdeatails({
              name: data.name,
              country: data.sys.country,
              description: data.weather[0].description,
              temp: Math.round(data.main.temp - 273),
              icon: data.weather[0].icon,
              class: data.weather[0].main,
            });
            setloading(false);
            console.log(new Date(data.dt*1000-(data.timezone*1000))); 
          });
      } catch (error) {
        console.log(error.message);
      }
    });
  }, []);

  return (
    <>
      {loading ? (
       <Loader/>
      ) : (
        <div className={`container ${details.class}`}>
          {error ? (
            <h4>{error}</h4>
          ) : (
            <Home
              setloading={setloading}
              setdeatails={setdeatails}
              setweeklydeatails={setweeklydeatails}
              seterror={seterror}
              Weeklydetails={Weeklydetails}
              details={details}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
