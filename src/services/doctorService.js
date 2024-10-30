// src/services/doctorService.js
// src/services/doctorService.js

const API_URL = 'http://localhost:3001/api/doctors'; // Cambia esto según tu configuración

// Obtener la lista de médicos
export const getDoctors = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener los médicos');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error; // Vuelve a lanzar el error para manejarlo donde se llame
    }
};

// Agregar un nuevo médico
export const addDoctor = async (name, specialty) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ name, specialty }),
        });
        if (!response.ok) {
            throw new Error('Error al agregar el médico');
        }
        return await response.json(); // Devuelve los datos del médico creado
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Actualizar un médico existente
export const updateDoctor = async (id, name, specialty) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ name, specialty }),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el médico');
        }
        return await response.json(); // Devuelve los datos del médico actualizado
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Eliminar un médico
export const deleteDoctor = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el médico');
        }
        return await response.json(); // Devuelve la respuesta del servidor
    } catch (error) {
        console.error(error);
        throw error;
    }
};
