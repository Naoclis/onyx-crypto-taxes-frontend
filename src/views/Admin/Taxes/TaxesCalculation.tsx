/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Taxes from '../Taxes';
import TaxesCalculation from '../../../components/Taxes/TaxesCalculation';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const TaxesCalculationView = () => {
    const title = "Calcul des impôts";
    //Render
    return (
        <Taxes selectedMenuItem={title}>
            <TaxesCalculation />
        </Taxes>
    );
};

export default TaxesCalculationView;