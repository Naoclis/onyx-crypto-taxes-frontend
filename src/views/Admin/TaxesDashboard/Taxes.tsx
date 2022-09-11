/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import TaxesDashboard from '../TaxesDashboard';
import Taxes from '../../../components/TaxesDashboard/Taxes';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const DashboardView = () => {
    const title = "Impôts";
    //Render
    return (
        <TaxesDashboard selectedMenuItem={title}>
            <Taxes />
        </TaxesDashboard>
    );
};

export default DashboardView;