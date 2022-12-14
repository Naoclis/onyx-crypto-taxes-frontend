/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import LoadFiles from '../LoadFiles';
import CompleteDatabase from '../../../components/LoadFiles/CompleteDatabase';

/*********** [ COMPONENT ] ****************/
const CompleteDatabaseView = () => {
    const title = "Ajout Fichiers Manuels";
    //Render
    return (
        <LoadFiles selectedMenuItem={title}>
            <CompleteDatabase />
        </LoadFiles>
    );
};

export default CompleteDatabaseView;