import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signstate, setSignstate] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [loading, setloading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setloading(true);
    if (signstate === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password); 
    }
  };

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt=''/>
      </div>:
    <div className='login'>
      <img src={logo} className="login-logo" alt='App Logo' />
      <div className="login-form">
        <h1>{signstate}</h1>
        <form>
          {signstate === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              placeholder='Your Name'
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
          <button onClick={user_auth} type='submit'>{signstate}</button>
          <div className="form-help">
            <div className="remember">
              <input type='checkbox' id="rememberMe" />
              <label htmlFor='rememberMe'>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
          <div className="form-switch">
            {signstate === "Sign In" ? (
              <p>New to Netflix? <span onClick={() => setSignstate("Sign Up")}>Sign Up Now</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setSignstate("Sign In")}>Sign In Now</span></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
