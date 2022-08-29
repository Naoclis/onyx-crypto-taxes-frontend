/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import LoadFiles from '../LoadFiles';
import FilesToLoad from '../../../components/LoadFiles/FilesToLoad';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const ListFiles = () => {
    const title = "Chargement des fichiers";
    //Render
    return (
        <LoadFiles selectedMenuItem={title}>
            <h1>{title}</h1>
            <h3>Liste des fichiers présents dans les répertoires, qu'il est possible de charger</h3>
            <FilesToLoad />
        </LoadFiles>
    );
};

export default ListFiles;