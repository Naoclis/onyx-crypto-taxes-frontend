/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Taxes from '../Taxes';
import OldAppTesting from '../../../components/Taxes/OldAppTesting';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const OldAppTestingView = () => {
    const title = "Recette (ancienne app)";
    //Render
    return (
        <Taxes selectedMenuItem={title}>
            <OldAppTesting />
        </Taxes>
    );
};

export default OldAppTestingView;