import React, { useState } from 'react';
import { login } from "../../services/authService";
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(correo, contraseña);
            localStorage.setItem('userRole', user.rol);

            if (user.rol === 'admin') {
                navigate('/manage-doctors'); // Redirigir al admin
            } else {
                navigate('/users'); // Redirigir al usuario
            }
        } catch (error) {
            console.error(error);
            alert('Error en el inicio de sesión');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Correo"
                    required
                />
                <input
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
            <p className="register-link">
                ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
            </p>
        </div>
    );
};

export default LoginForm;
