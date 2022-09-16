import React, { useEffect } from "react";
import { ApiKey } from './../App';

function WeeklyWeather({ Weeklydetails,setweeklydeatails,setloading }) {

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitute = position.coords.longitude;
      try {
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitute}&cnt=5&appid=${ApiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            setweeklydeatails(data.list);
            setloading(false);
          });
      } catch (error) {
        console.log(error.message);
      }
    });
  }, [setloading,setweeklydeatails]);
  return (
    <>
      <div className="title">
        <div className="line"></div>
        <h4>Weekly Forecast</h4>
        <div className="line"></div>
      </div>
      <div className="weekly-container">
        {Weeklydetails.map((item) => {
          const iconUrl = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
          const description = item.weather[0].description;
          const temp = Math.round(item.main.temp - 273);
          const key = item.weather[0].id;
          return (
            <div className="weekly-card" key={key}>
              <img src={iconUrl} alt="" />
              <h6 className="temp">{temp} &#8451;</h6>
              <span className="description">{description}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WeeklyWeather;
