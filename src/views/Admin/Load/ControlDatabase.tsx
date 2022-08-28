/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Load from '../Load';
/*********** [ COMPONENT ] ****************/
const ControlDatabase = () => {
    const title = "Contr�le des donn�es";
    //Render
    return (
        <Load selectedMenuItem={title}>
            <h1>{title}</h1>
            <h3>Liste des fichiers pr�sents dans les r�pertoires, qu'il est possible de charger</h3>
        </Load>
    );
};

export default ControlDatabase;