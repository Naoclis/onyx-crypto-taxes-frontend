/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import LoadFiles from '../LoadFiles';
import FilesLoaded from '../../../components/LoadFiles/FilesLoaded';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const ControlFiles = () => {
    const title = "Contrôle des fichiers";
    //Render
    return (
        <LoadFiles selectedMenuItem={title}>
            <h1>{title}</h1>
            <h3>Liste des fichiers présents dans les répertoires, traités pour créer des fichiers de transactions</h3>
            <FilesLoaded />
        </LoadFiles>
    );
};

export default ControlFiles;