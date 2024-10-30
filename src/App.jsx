import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ListDoctors from './Components/Recipes/ListDoctors'; // Asegúrate de que este sea el nombre correcto
import LoginForm from './Components/Recipes/LoginForm';
import RegisterForm from './Components/Recipes/RegisterForm';
import { getProfile } from './services/authService';
import ManageDoctors from './Components/Recipes/ManageDoctors';
import Navbar from './Components/Recipes/Navbar';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Añadir estado para admin
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const userProfile = await getProfile(); // Verifica si el token es válido
                setIsAuthenticated(true);
                setIsAdmin(userProfile.rol === 'admin'); // Establecer si es admin
            } catch (error) {
                setIsAuthenticated(false); // Si hay un error, no está autenticado
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    // Si aún se está verificando la autenticación, puedes mostrar un spinner o un mensaje de carga
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <Router>
            <Navbar isAdmin={isAdmin} /> {/* Pasar el estado de admin al Navbar */}
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/users" /> : <LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/users" element={isAuthenticated ? <ListDoctors /> : <Navigate to="/" />} />
                <Route path="/manage-doctors" element={isAdmin ? <ManageDoctors /> : <Navigate to="/users" />} /> {/* Verificar si es admin */}
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirige cualquier ruta desconocida al login */}
            </Routes>
        </Router>
    );
};

export default App;
