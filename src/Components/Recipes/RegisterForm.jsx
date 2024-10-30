// src/Components/Recipes/RegisterForm.jsx

import React, { useState } from 'react';
import { register } from "../../services/authService";
import './RegisterForm.css'; // Asegúrate de crear este archivo CSS

const RegisterForm = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('paciente');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await register(nombre, correo, contraseña, rol);
            console.log('Usuario registrado:', user);
            // Redirigir a otra página si es necesario
        } catch (error) {
            console.error(error);
            alert('Error en el registro');
        }
    };

    return (
        <div className="register-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Nombre" 
                    required 
                />
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
                <select value={rol} onChange={(e) => setRol(e.target.value)} required>
                    <option value="paciente">Paciente</option>
                    <option value="médico">Médico</option>
                    <option value="admin">Administrador</option>
                </select>
                <button type="submit" className="register-button">Registrar</button>
            </form>
            <p className="login-link">
                ¿Ya tienes una cuenta? <a href="/">Inicia sesión aquí</a>
            </p>
        </div>
    );
};

export default RegisterForm;
