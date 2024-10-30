// src/services/authService.js

const API_URL = 'http://localhost:3001/api'; // Cambia esto según tu configuración

// Registrar usuario
export const register = async (nombre, correo, contraseña, rol) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, correo, contraseña, rol }),
  });

  if (!response.ok) {
    throw new Error('Error en el registro');
  }

  return await response.json();
};

// Iniciar sesión
export const login = async (correo, contraseña) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo, contraseña }),
  });

  if (!response.ok) {
    throw new Error('Error en el inicio de sesión');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token); // Guardar el token en localStorage
  return data.user;
};

// Obtener perfil
export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('No autorizado');
  }

  return await response.json();
};


export const logout = () => {
    localStorage.removeItem('token'); // o cualquier otra limpieza necesaria
    localStorage.removeItem('userRole'); // Limpia el rol también si es necesario
};


