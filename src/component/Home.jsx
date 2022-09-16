import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import CurrentWeather from "./CurrentWeather";
import Search from "./Search";
import WeeklyWeather from "./WeeklyWeather";

function Home({
  setdeatails,
  setweeklydeatails,
  details,
  Weeklydetails,
  seterror,
  setloading,
}) {
  const [show, setshow] = useState(false);
  return (
    <>
      <div className="ctrl">
        {show ? (
          <AiOutlineClose onClick={() => setshow(false)} />
        ) : (
          <BsSearch onClick={() => setshow(true)} />
        )}
      </div>
      <Search
        setdeatails={setdeatails}
        setloading={setloading}
        setweeklydeatails={setweeklydeatails}
        seterror={seterror}
        show={show}
        setshow={setshow}
      />
      <div className="home-container">
        <CurrentWeather
          setdeatails={setdeatails}
          setloading={setloading}
          seterror={seterror}
          details={details}
        />
        <WeeklyWeather
          setloading={setloading}
          setweeklydeatails={setweeklydeatails}
          Weeklydetails={Weeklydetails}
        />
      </div>
    </>
  );
}

export default Home;
