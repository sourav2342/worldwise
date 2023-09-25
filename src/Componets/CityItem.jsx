import { useCities } from "../contexts/CitiesContext";
import styles from "./Cityitem.module.css";
import {Link} from "react-router-dom";

export default function CityItem({city}){

    const {currentCity, deleteCity } = useCities();
    const {cityName, emojo, date, id, position} = city;

    function deleteItem(e){
        e.preventDefault();
        deleteCity(id);
    }

    //console.log(position);
    return <li>
    <Link className={`${styles.cityItem} ${currentCity.id === id? 
        
        styles["cityItem--active"] : ""}`} 

        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
    >
        <span className={styles.emoji}>{emojo}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{date}</time>
        <button onClick={deleteItem} className={styles.deleteBtn}>&times;</button>
        </Link>
    </li>
}