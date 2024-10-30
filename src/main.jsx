// index.js (o main.js)
import React from 'react';
import { createRoot } from 'react-dom/client'; // Importar createRoot
import App from './App';

const root = createRoot(document.getElementById('root')); // Crear el root
root.render(<App />); // Renderizar la aplicación
