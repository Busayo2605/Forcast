import React from "react";

function CurrentWeather({ details, setdeatails, setloading, seterror }) {
  const { name, country, description, temp, icon } = details;
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

  return (
    <div className="current-weather">
      <div className="current-name">
        <h4 className="name">{name}</h4>
        <span>{country}</span>
        {/* <h3>{new Date}</h3> */}
      </div>
      <div className="icon">
        <img src={iconUrl} alt="" />
      </div>
      <h5 className="temp">{temp} &#8451;</h5>
      <p className="description">{description}</p>
    </div>
  );
}

export default CurrentWeather;
