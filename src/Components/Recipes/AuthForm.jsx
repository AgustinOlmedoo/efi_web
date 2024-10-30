// src/components/AuthForm.jsx
import { useState } from 'react';
import { login, register } from '../../services/authService';

const AuthForm = ({ isLogin }) => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            await login(correo, contraseña);
        } else {
            await register(nombre, correo, contraseña, rol);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {!isLogin && (
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            )}
            <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
            {!isLogin && (
                <select value={rol} onChange={(e) => setRol(e.target.value)} required>
                    <option value="">Seleccione rol</option>
                    <option value="admin">Admin</option>
                    <option value="médico">Médico</option>
                    <option value="paciente">Paciente</option>
                </select>
            )}
            <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
        </form>
    );
};

export default AuthForm;
