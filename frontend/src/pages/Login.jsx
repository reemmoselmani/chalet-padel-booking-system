import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({name :'', email : ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials,[e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/api/login', credentials);
            // Save the token so we can use it for authorized requests later
            localStorage.setItem('token', response.data.token);
            alert("Login Successful!");
            navigate('/'); //Redirect to Home page after login
        }catch(err){
            alert("Login Failed:" + (err.response?.data?.message || "Invalid Credentials"));
        }
    };
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br/><br/>
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br/><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;