/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import LoadFiles from '../LoadFiles';
import ControlStagingArea from '../../../components/LoadFiles/ControlStagingArea';

/*********** [ COMPONENT ] ****************/
const ControlDatabase = () => {
    const title = "Contrôle des stagings area";
    //Render
    return (
        <LoadFiles selectedMenuItem={title}>
            <h1>{title}</h1>
            <h3>Staging Area, vérification avant insertion dans tables finales</h3>
            <ControlStagingArea />
        </LoadFiles>
    );
};

export default ControlDatabase;