/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import LoadFiles from '../LoadFiles';
import CompleteDatabase from '../../../components/LoadFiles/CompleteDatabase';

/*********** [ COMPONENT ] ****************/
const ControlDatabase = () => {
    const title = "Ajout Fichier Manuel";
    //Render
    return (
        <LoadFiles selectedMenuItem={title}>
            <CompleteDatabase />
        </LoadFiles>
    );
};

export default ControlDatabase;