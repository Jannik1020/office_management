import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./LoginPage.module.css";
import { loginUser } from "./userSlice";

export default function LoginPage() {
  const [uname, setUName] = useState("");
  // const [pwd, setPwd] = useState("");

  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(uname));
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.loginForm} onSubmit={handleFormSubmit}>
        <h1>Anmelden</h1>
        <input
          name="uname"
          className={styles.input}
          type="text"
          placeholder="Benutzername"
          autoComplete="off"
          onChange={(e) => setUName(e.target.value)}
          value={uname}
          required
        />
        {/*<input
          name="pwd"
          className={styles.input}
          type="password"
          placeholder="Passwort"
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
        />*/}
        <button className={styles.submitBtn} type="submit">
          Anmelden
        </button>
      </form>
    </div>
  );
}
