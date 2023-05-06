import React, { useContext } from "react";
import {  useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";
import axios from "./Api/axios";
import AuthContext from "../component/AuthProvider";

// const LOGIN_URL = '/auth';
function Login() {
  const {setAuth} = useContext(AuthContext)
  const userRef = useRef();
  const errRef = useRef()

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
   


//   //focuses on input
  useEffect(() => {
  userRef.current.focus();
  }, []);
  //focuses on errors
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  //submit for the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    //introduce axios try catch
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({user, pwd}),
        {
          Headers:{'Content-Type': 'application/json'},
          withCredentials:true
        }
        );
        console.log(JSON.stringify(response?.data))
        const accessToken = response.data?.accessToken
        const roles = response.data?.roles
        setAuth({user, pwd,roles,accessToken})
        
      setSuccess(true)  
      setUser('')
      setPwd('')
    } catch (error) {
      if (!errMsg.response) {
        setErrMsg('no server response')
        
      }else if (err.response?.status === 400) {
        setErrMsg('Missing username or psw')
      }else if (err.response?.status === 401) {
        setErrMsg('unauthorized')
      
    }else{
      setErrMsg('login failed ')
    }
    //pass error focus
    errRef.current.focus();
   
   
  };

  return (
    //pass a tanary statement for navigation when and not logged in
    <>
    {success ? (<section>
        <h1>you are logged in</h1>
        <br/>
        <p>
            <a href="#"> go back home </a>
        </p>
    </section>
    ):(
    <section className="login-form" style={{
      width:"100%",
      backgroundColor:"aqua",
      direction:"flex",
      maxHeight:"760vh",
      alignContent:"center",
      alignItem:"center"
    }}>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form className="from-submit" onChange={handleSubmit} style={{
        display:"flex",
        alignContent:"center",
        alignItem:"center",
        maxHeight:"760px",
        maxWidth:"100%s"

      }}>
        <label htmlFor="username">Username:</label>
        <input
        style={{}}
          type="text"
          id="username"
          ref={userRef}
          value={user}
        //   autoComplete="off"
          required
          onChange={(e) => setUser(e.target.value)}
        />
     
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          value={pwd}
          required
          onChange={(e) => setPwd(e.target.value)}
        />
       
        
        <button type="submit">  Sign Up </button>

      </form>
      <p> Need to Sign an a acount?<br/> 
      <span className="line">
        {/* put your link here */}
        <a href="#"> Sign Up</a>
      </span>
      </p>
    </section>
    )}
    </>

  );
 }

export default Login
