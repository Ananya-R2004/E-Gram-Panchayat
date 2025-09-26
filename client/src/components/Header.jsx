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

    // Scroll to section helper
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="bg-green-700 bg-opacity-90 text-white flex justify-between items-center px-8 py-4 shadow-lg fixed w-full z-50">
            <div className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection('hero')}>
                e-Gram Panchayat
            </div>
            <ul className="flex gap-8 font-medium items-center">
                <li>
                    <button onClick={() => scrollToSection('hero')} className="hover:underline">Home</button>
                </li>
                {user && (
                    <li>
                        <Link to="/profile" className="hover:underline">My Profile</Link>
                    </li>
                )}
                <li>
                    <Link to="/services" className="hover:underline">Services</Link>
                </li>
                <li>
                    <button onClick={() => scrollToSection('about')} className="hover:underline">About</button>
                </li>
                <li>
                    <button onClick={() => scrollToSection('contact')} className="hover:underline">Contact</button>
                </li>
                {user ? (
                    <li>
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                    </li>
                ) : (
                    <li>
                        <Link to="/login" className="hover:underline">Login</Link>
                    </li>
                )}
                <li>
                    <select className="bg-green-500 text-white px-2 py-1 rounded" defaultValue="English">
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
