import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login");
    };

    return (
        <nav className="bg-green-700 bg-opacity-90 text-white flex justify-between items-center px-8 py-4 shadow-lg">
            <div className="text-2xl font-bold">e-Gram Panchayat</div>
            <ul className="flex gap-8 font-medium items-center">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                {user && <li><Link to="/profile" className="hover:underline">My Profile</Link></li>}
                <li><Link to="/services" className="hover:underline">Services</Link></li>
                <li><Link to="/about" className="hover:underline">About</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                {user ? (
                    <li><button onClick={handleLogout} className="hover:underline">Logout</button></li>
                ) : (
                    <li><Link to="/login" className="hover:underline">Login</Link></li>
                )}
                <li>
                    <select
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        defaultValue="English"
                    >
                        <option value="English">English</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Hindi">Hindi</option>
                    </select>
                </li>
            </ul>
        </nav>
    );
};

export default Header;