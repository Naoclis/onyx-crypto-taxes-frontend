/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import LoadFiles from '../LoadFiles';
import Help from '../../../components/LoadFiles/Help';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const HelpView = () => {
    const title = "Consignes de chargement des fichiers";
    //Render
    return (
        <LoadFiles selectedMenuItem={title}>
            <h1>{title}</h1>
            <Help />
        </LoadFiles>
    );
};

export default HelpView;