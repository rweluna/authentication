import React, { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
    const {setUser} = useContext(UserContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        email:'',
        password:'',
        confirmPassword: '',
    });
    const { name, dob, email, password, confirmPassword } = formData;
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };

    const validateForm = () => {
        if (!name || !dob || !email || !password || !confirmPassword) {
            setError("All field are required.");
            return false;
        }
        if (password.length < 8) {
            setError("Password must be atleast 8 characters long.");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }
        return true; 
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        if (!validateForm()) return;


        try {
            const {data} = await axios.post('/register', {
                name,
                dob,
                email,
                password,
            });
            localStorage.setItem('token', data.token)
            if (data.error) {
                toast.error(data.error);
            } else{
                setUser(data.user);
                toast.success('Register successful. Redirecting to login...')
                navigate('/')
            }

        } catch (error) {
// show backend error
            if (error.response && error.response.data.error) {
            toast.error(error.response.data.error);
            } else {
            toast.error(('Something went wrong. Please try again.'))
}
        }
    };

    return (
        <div>
            <form onSubmit={ handleRegister } className='register-form'>
                <h2> Register </h2>
                <div className='form-group'>
                    <input name='name' type='text' value={ name } onChange={handleChange} required />
                    <label htmlFor='name'>
                        Enter your name
                    </label>
                </div>
                <div className='form-group' >
                    <input name='dob' type='date' value={dob} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <input name='email' type='email' value={email} onChange={handleChange} required autoComplete='email' />
                    <label htmlFor='email'>
                        Enter your email
                    </label>
                </div>
                <div className='form-group'>
                    <input name='password' type='password' value={password} onChange={handleChange} required/>
                    <label htmlFor='password'>
                        Enter your password
                    </label>
                </div>
                <div className='form-group'>
                    <input name='confirmPassword' type='password' value={confirmPassword} onChange={handleChange} required/>
                    <label htmlFor='password'>
                        Re-enter your password
                    </label>
                </div>
                {error && <p className='error-message'>{error}</p>}
                <button type='submit'> Register </button>
            </form>
        </div>
    )

}

