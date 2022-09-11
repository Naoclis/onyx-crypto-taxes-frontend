/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import TaxesDashboard from '../TaxesDashboard';
import Valorizations from '../../../components/TaxesDashboard/Valorizations';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const DashboardView = () => {
    const title = "Valorisations Portefeuille";
    //Render
    return (
        <TaxesDashboard selectedMenuItem={title}>
            <Valorizations />
        </TaxesDashboard>
    );
};

export default DashboardView;