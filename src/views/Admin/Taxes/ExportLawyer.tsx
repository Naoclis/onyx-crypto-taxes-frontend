/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Taxes from '../Taxes';
import ExportLawyer from '../../../components/Taxes/ExportLawyer';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const ExportLawyerView = () => {
    const title = "Calcul des imp�ts";
    //Render
    return (
        <Taxes selectedMenuItem={title}>
            <ExportLawyer />
        </Taxes>
    );
};

export default ExportLawyerView;