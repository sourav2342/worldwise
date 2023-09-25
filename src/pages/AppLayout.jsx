import Sidebar from "../Componets/SideBar";
import styles from "./AppLayout.module.css";
import Map from "../Componets/Map";
import User from "../Componets/User";

export default function AppLayout(){
    return <div className={styles.app}>
        <Sidebar />
        <Map />
        <User/>
    </div>
}