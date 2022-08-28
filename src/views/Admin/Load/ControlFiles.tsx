/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Load from '../Load';
import FilesLoaded from '../../../components/LoadFiles/FilesLoaded';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const ControlFiles = () => {
    const title = "Contrôle des fichiers";
    //Render
    return (
        <Load selectedMenuItem={title}>
            <h1>{title}</h1>
            <h3>Liste des fichiers présents dans les répertoires, traités pour créer des fichiers de transactions</h3>
            <FilesLoaded />
        </Load>
    );
};

export default ControlFiles;