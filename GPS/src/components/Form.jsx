// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
// import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
// import { create } from "json-server";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const Base_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [emoji, setEmoji] = useState("");
  const [lat, lng] = useUrlPosition();
  const {createCity}=useCities();
  const [cityName, setCityName] = useState("");
  const [isLoadingGeoCoding, setIsloadGeoCoding] = useState();
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate=useNavigate();
  const [geoCodingError, setGeoCodingError] = useState("");
  // const navigate=useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(country);
    console.log("form");
    if(!cityName || !date)return;
    const newCity={
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{lat,lng},
    }
    console.log(newCity);
    await createCity(newCity);
    navigate('/app/cities');

  }
  useEffect(
    function () {
      async function fetchCity() {
        try {
          if (!lat && !lng) return;
          setIsloadGeoCoding(true);
          setGeoCodingError("");
          const res = await fetch(
            `${Base_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error("That is not a city .  Click somewhere else");
          console.log(data);
          setCityName(data.city || data.locality || "");
          setEmoji(convertToEmoji(data.countryCode));
          setCountry(data.countryName);
        } catch (e) {
          setGeoCodingError(e.message);
        } finally {
          setIsloadGeoCoding(false);
        }
      }
      fetchCity();
    },
    [lat, lng]
  );
  if (isLoadingGeoCoding) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  return (
  <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}

          /> */}
        <DatePicker
          id="date"
          onChange={(e) => setDate(e)}
          selected={date}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
        {/* <button>&larr; Back</button> */}
      </div>
    </form>
  );
}

export default Form;
