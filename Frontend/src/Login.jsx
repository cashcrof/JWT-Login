import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Login(props){
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const { updateToken } = useContext(AuthContext);

    const handleLogin = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', loginEmail);
        formData.append('password', loginPassword);

        const result = await axios({
            method: 'post',
            url: '/api/login',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const token = result.data.accessToken;
        updateToken(token);
  }

    const handleChanges = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'loginEmail':
        setLoginEmail(value);
        break;
      case 'loginPassword':
        setLoginPassword(value);
        break;
      default:
        break;
    }
  }
  return(
    <div className='form-area'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input type="text" name="loginEmail" onChange={handleChanges}/>
          </label>
          <label>
            Password:
            <input type="text" name="loginPassword" onChange={handleChanges}/>
          </label>
          <input className="submit" type="submit" value="Login" onChange={handleChanges}/>
        </form>
      </div>
    );
}

export default Login;