import {React} from "react";
import styles from "./Navigation.module.css"
import {Link} from "react-router-dom";

export default function Navigation(props) {
    return (
        <div className={styles.navigation}>
            <div className={styles.navHeader}>
                <p className={styles.itemContent}>Tools</p>
            </div>
            <div className={styles.navItem}>
                <Link className={styles.itemContent} to="/tasks">Meine Aufgaben</ Link>
            </div>
            <div className={styles.navItem}>
                <Link className={styles.itemContent} to="/office-tasks">Zugewiesene Aufgaben</ Link>
            </div>
            <div className={styles.navItem}>
                <Link className={styles.itemContent} to="/rooms">Raumreservierung</ Link>
            </div>
            <div className={styles.navItem}>
                <Link className={styles.itemContent} to="/shopping">Einkaufsliste</ Link>
            </div>
            <div className={styles.navItem}>
                <Link className={styles.itemContent} to="/cleaning">Putzplan</ Link>
            </div>
        </div>
    )
}