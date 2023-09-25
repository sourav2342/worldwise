import Countryitem from "./Countryitem.jsx"
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

export default function CountriesList(){

    const {cities, isLoading} = useCities();

    if(isLoading)return <Spinner/>

    if(!cities.length) return <Message message="Add yout first city by clicking on a city on the map"/>
    
    const countries = cities.reduce((arr, city)=>{
        if(!arr.map(el => el.country).includes(city.country))
        return [...arr, {country: city.country, emoji:city.emoji}]
        else return arr;
    },[]);

    return <ul className={styles.countryList}>
       {countries.map(country => 
       <Countryitem country={country} emoji={country.emoji} key={country.id}/>
       )}
    </ul>;
}