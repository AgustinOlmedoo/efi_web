// src/Components/Doctors/ListDoctors.jsx

import React, { useState, useEffect, Fragment } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProgressSpinner } from 'primereact/progressspinner';
import { getDoctors } from '../../services/doctorService'; // Asegúrate de tener este servicio
import './ListDoctors.css'; // Importa el CSS para estilizar el componente

const ListDoctors = () => {
    const [dataDoctors, setDataDoctors] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [openDialogDoctor, setOpenDialogDoctor] = useState(false);

    const fetchDoctors = async () => {
        try {
            const results = await getDoctors(); // Obtener la lista de médicos
            setDataDoctors(results);
        } catch (error) {
            console.error("Error al obtener los médicos:", error);
        } finally {
            setLoadingDoctors(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setOpenDialogDoctor(true);
    };

    const BodyTemplate = (rowData) => {
        return (
            <Button 
                label="Detalles" 
                onClick={() => handleDoctorSelect(rowData)} 
                icon='pi pi-eye' 
                className="p-button-info"
            />
        );
    };

    return (
        <Fragment>
            {loadingDoctors ? (
                <ProgressSpinner />
            ) : (
                <div className="doctor-table">
                    <h2>Lista de Médicos</h2>
                    <DataTable value={dataDoctors} tableStyle={{ minWidth: '50rem' }} paginator rows={10}>
                        <Column field="nombre" header="Nombre" sortable></Column>
                        <Column field="especialidad" header="Especialidad" sortable></Column>
                        <Column body={BodyTemplate} header="Acciones"></Column>
                    </DataTable>
                </div>
            )}
            <Dialog 
                header="Detalles del Médico" 
                visible={openDialogDoctor} 
                style={{ width: '50vw' }} 
                onHide={() => setOpenDialogDoctor(false)}
            >
                {selectedDoctor && (
                    <div>
                        <p><strong>Nombre:</strong> {selectedDoctor.nombre}</p>
                        <p><strong>Especialidad:</strong> {selectedDoctor.especialidad}</p>
                        <p><strong>Correo:</strong> {selectedDoctor.correo}</p>
                    </div>
                )}
            </Dialog>
        </Fragment>
    );
};

export default ListDoctors;
