 import { useState } from 'react';

import axios from 'axios';


const Register = () => {

    const [user, setUser] = useState({name : '', email : '', password : ''});

    const handleChange = (e) => {

        setUser({...user,[e.target.name]:e.target.value});

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:3000/api/register', user);

            alert("Success: " + response.data.message);

        } catch (err) {

            alert("Error: " + (err.response?.data || "Server error"));

        }

    };

    return(

        <div>

            <h2>Create an Account</h2>

            <form onSubmit={handleSubmit}>

                <label>

                    Name :

                    <input name='name' type='text' placeholder='Name' onChange={handleChange} required />

                </label>

                <br/><br/>

                <label>

                    Email :

                    <input name='email' type='email' placeholder='Email' onChange={handleChange} required />

                </label>

                <br/><br/>

                <label>

                    Password :

                    <input name='password' type='password' placeholder='Password' onChange={handleChange} required />

                </label>

                <br/><br/>

                <button type='submit'>Register</button>

            </form>


        </div>

    );

};


export default Register; 