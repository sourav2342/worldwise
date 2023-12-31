// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {

  const {lat, lng} = useUrlPosition();
  
  const { createCity } = useCities();

  const navigate = useNavigate(); // useNavigation is called as useHistory in previous version of react router
  
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [emoji, setEmoji] = useState(); 
  const [err, setErr] = useState("");

  const [isLoadingGeoCode, setIsLoadingGeoCode] = useState(false);


  async function handleSubmit(e){
    e.preventDefault();

    if(!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng},
      //id is generated by fake api server! 
    }

    await createCity(newCity);
    navigate("/app/cities");
  }

  useEffect(function(){

    if(!lat && !lng) return;

    async function fetchCityData(){
      try{
        setErr("");
        setIsLoadingGeoCode(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();
        console.log(data);

        if(!data.countryCode) throw new Error("click somewhere else");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode))
      } catch(err){
        setErr(err.message);
      } finally{
        setIsLoadingGeoCode(false);
        
      }
    }
    fetchCityData();
  },[lat, lng]);

  if(isLoadingGeoCode) return <Spinner/>


  if(!lat && !lng) return <Message message="start by clicking on the map"/>;

  if(err) return <Message message={err}/>;

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
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker 
          id="date"
          onChange={(date)=>{setDate(date)}}  
          selected={date} 
          dateFormat="dd/MM/yyyy"
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
        <Button type="back" 
        onClick={(e)=>{
          e.preventDefault();
          navigate(-1);//return a step back in browser history;
        }}
        >&larr; Back</Button>
        
      </div>
    </form>
  );
}

export default Form;
