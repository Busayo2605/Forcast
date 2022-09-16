import React, { useEffect, useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ApiKey } from "../App";

function Search({
  click,
  setdeatails,
  setloading,
  setweeklydeatails,
  seterror,
  show,
  setshow
}) {
  const [searchInput, setsearchInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${ApiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.cod === 404) {
            seterror("NO CITY FOUND......");
          } else {
            setdeatails({
              name: data.name,
              country: data.sys.country,
              description: data.weather[0].description,
              temp: Math.round(data.main.temp - 273),
              icon: data.weather[0].icon,
              class: data.weather[0].main,
            });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }, [searchInput, setdeatails, setloading, seterror]);
  useEffect(() => {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&cnt=5&appid=${ApiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.list.length === 0) {
            setloading(true);
          } else {
            setloading(false);
            setweeklydeatails(data.list);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }, [searchInput, setweeklydeatails,seterror]);

  return (
    <>
      <form className={show? "search active" : "search"}>
        <input
          transition={{ duration: 0.5 }}
          ref={inputRef}
          className={show? "search-input active" : "search-input"}
          placeholder="Search Location"
          type="text"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
        />
      </form>
    </>
  );
}

export default Search;
