import React, { useState, useContext } from 'react';
import axios from 'axios';

function Register(props){
    const [username, setUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const handleRegister = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('displayName', username);
        formData.append('email', registerEmail);
        formData.append('password', registerPassword);
        const result = await axios({
            method: 'post',
            url: '/api/signup',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        console.log(result.data.token);
        const token = result.data.token 
        updateToken(token);
    }

    const handleChanges = e => {
        const { name, value } = e.target;
        switch (name) {
        case 'username':
            setUsername(value);
            break;
        case 'registerEmail':
            setRegisterEmail(value);
            break;
        case 'registerPassword':
            setRegisterPassword(value);
            break;
        default:
            break;
        }
    }
    return(
        <div className='form-area'>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
            <label>
                Name:
                <input type="text" name="username" onChange={handleChanges}/>
            </label>
            <label>
                Email:
                <input type="text" name="registerEmail" onChange={handleChanges}/>
            </label>
            <label>
                Password:
                <input type="text" name="registerPassword" onChange={handleChanges}/>
            </label>
            <input className="submit" type="submit" value="Register" />
            </form>
        </div>
    )
}
export default Register;