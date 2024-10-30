// src/Components/Doctors/ManageDoctors.jsx

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getDoctors, addDoctor, updateDoctor, deleteDoctor } from '../../services/doctorService';

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');

    const fetchDoctors = async () => {
        try {
            const results = await getDoctors();
            setDoctors(results);
        } catch (error) {
            console.error('Error al obtener los médicos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleDialogOpen = (doctor = null) => {
        if (doctor) {
            setSelectedDoctor(doctor);
            setName(doctor.nombre);
            setSpecialty(doctor.especialidad);
        } else {
            setSelectedDoctor(null);
            setName('');
            setSpecialty('');
        }
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedDoctor) {
                await updateDoctor(selectedDoctor.id, name, specialty);
            } else {
                await addDoctor(name, specialty);
            }
            fetchDoctors(); // Refresca la lista después de agregar/actualizar
            handleDialogClose(); // Cierra el diálogo
        } catch (error) {
            console.error('Error al guardar el médico:', error);
            alert('Error al guardar el médico');
        }
    };

    const handleDelete = async (doctor) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar al médico ${doctor.nombre}?`);
        if (confirmDelete) {
            try {
                await deleteDoctor(doctor.id);
                fetchDoctors(); // Refresca la lista después de eliminar
            } catch (error) {
                console.error('Error al eliminar el médico:', error);
                alert('Error al eliminar el médico');
            }
        }
    };

    return (
        <div>
            <h2>Gestionar Médicos</h2>
            {loading ? (
                <ProgressSpinner />
            ) : (
                <>
                    <Button label="Agregar Médico" icon="pi pi-plus" onClick={() => handleDialogOpen()} />
                    <DataTable value={doctors} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="nombre" header="Nombre"></Column>
                        <Column field="especialidad" header="Especialidad"></Column>
                        <Column body={(rowData) => (
                            <div>
                                <Button 
                                    label="Editar" 
                                    icon="pi pi-pencil" 
                                    onClick={() => handleDialogOpen(rowData)} 
                                    className="p-button-warning" 
                                />
                                <Button 
                                    label="Eliminar" 
                                    icon="pi pi-trash" 
                                    onClick={() => handleDelete(rowData)} 
                                    className="p-button-danger" 
                                />
                            </div>
                        )} header="Acciones" />
                    </DataTable>
                </>
            )}

            <Dialog header={selectedDoctor ? 'Editar Médico' : 'Agregar Médico'} visible={openDialog} style={{ width: '50vw' }} onHide={handleDialogClose}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Especialidad:</label>
                        <input type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
                    </div>
                    <Button type="submit" label={selectedDoctor ? 'Actualizar' : 'Agregar'} />
                </form>
            </Dialog>
        </div>
    );
};

export default ManageDoctors;
