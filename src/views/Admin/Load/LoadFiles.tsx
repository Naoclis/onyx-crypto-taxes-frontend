/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Load from '../Load';
import FilesToLoad from '../../../components/LoadFiles/FilesToLoad';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const LoadFiles = () => {
    const title = "Chargement des fichiers";
    //Render
    return (
        <Load selectedMenuItem={title}>
            <h1>{title}</h1>
            <h3>Liste des fichiers présents dans les répertoires, qu'il est possible de charger</h3>
            <FilesToLoad />
        </Load>
    );
};

export default LoadFiles;