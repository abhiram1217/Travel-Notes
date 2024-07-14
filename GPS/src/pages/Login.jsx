import {  useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../components/Button";
export default function Login() {
  const [email, setEmail] = useState("shasankreddy4563@gmail.com");
  const [password, setPassword] = useState("reddy4563");
 const {isAuthenticated,login}=useAuth();

 function handleSubmit(e){
  e.preventDefault();
    if(email&&password)
      login(email,password);
 }
const navigate=useNavigate();
 useEffect(function(){
   if(isAuthenticated)
    navigate("/app",{replace:true});
 },[isAuthenticated,navigate])
  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
