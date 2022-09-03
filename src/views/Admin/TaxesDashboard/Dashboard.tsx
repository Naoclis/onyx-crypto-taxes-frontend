/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import TaxesDashboard from '../TaxesDashboard';
import Dashboard from '../../../components/TaxesDashboard/Dashboard';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const DashboardView = () => {
    const title = "Rapport Impôts";
    //Render
    return (
        <TaxesDashboard selectedMenuItem={title}>
            <Dashboard />
        </TaxesDashboard>
    );
};

export default DashboardView;