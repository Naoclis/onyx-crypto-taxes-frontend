/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Taxes from '../Taxes';
import Help from '../../../components/Taxes/Help';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const HelpView = () => {
    const title = "Consignes";
    //Render
    return (
        <Taxes selectedMenuItem={title}>
            <h1>{title}</h1>
            <Help />
        </Taxes>
    );
};

export default HelpView;