import React, { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../design/login.css';


export default function Login() {
    const {setUser} = useContext(UserContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {email,password} = formData;
    
    const validateForm =() => {
        if (!email || !password){
            setError("All fields are required.")
        }
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/login', {email, password});

            if (data.error) {
                toast.error(data.error);
            } else {
                setUser(data.user); // save user in context
                toast.success('Login successful!')
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.')
        }
    };
    return (
    <div>
      <form onSubmit={ handleLogin } className='login-form'>
        <h2>Login</h2>
        <div className='form-group'>
            <input name ='email' type='email' value={email} onChange={ handleChange } required /> 
            <label htmlFor="email">
                Enter your email
            </label>
        </div>
        <div className='form-group'>
            <input name='password' type='password' value={password} onChange={ handleChange } required/>
            <label htmlFor="password">
                Enter your password
            </label>
        </div>
        <div>
            <button type='submit'> Login </button>
        </div>
      </form>
    </div>
  )
}
