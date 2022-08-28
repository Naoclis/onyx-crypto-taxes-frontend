/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Load from '../Load';
/*********** [ COMPONENT ] ****************/
const ControlDatabase = () => {
    const title = "Contrôle des données";
    //Render
    return (
        <Load selectedMenuItem={title}>
            <h1>{title}</h1>
            <h3>Liste des fichiers présents dans les répertoires, qu'il est possible de charger</h3>
        </Load>
    );
};

export default ControlDatabase;