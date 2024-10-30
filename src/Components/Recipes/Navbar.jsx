import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

const Navbar = ({ isAdmin }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirige al usuario a la página de inicio de sesión
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                {isAdmin && (
                    <li>
                        <Link to="/manage-doctors">Gestionar Médicos</Link>
                    </li>
                )}
                <li>
                    <Link to="/register">Registrar</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
