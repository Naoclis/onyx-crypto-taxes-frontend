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
            <FilesToLoad />
        </LoadFiles>
    );
};

export default ListFiles;