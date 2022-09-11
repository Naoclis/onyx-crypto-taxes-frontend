/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import TaxesDashboard from '../TaxesDashboard';
import Invests from '../../../components/TaxesDashboard/Invests';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const DashboardView = () => {
    const title = "Investissements";
    //Render
    return (
        <TaxesDashboard selectedMenuItem={title}>
            <Invests />
        </TaxesDashboard>
    );
};

export default DashboardView;