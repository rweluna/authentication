import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

export default function Dashboard() {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate('/login');
    };
    return (
        <div>
            <h2>Welcome</h2>
            <button onClick={handleLogout}>Logout</button>
        </div> 
    ) 
}
