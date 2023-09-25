import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return <div className={styles.home}>
    <img src="/icon.png" alt="WorldWise logo" className={styles.logo} />
    <Link to="/">Worldwise</Link>
    </div>;
}

export default Logo;
