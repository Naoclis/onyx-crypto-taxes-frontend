/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import TaxesDashboard from '../TaxesDashboard';
import SellOrders from '../../../components/TaxesDashboard/SellOrders';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const SellOrdersView = () => {
    const title = "Cessions";
    //Render
    return (
        <TaxesDashboard selectedMenuItem={title}>
            <SellOrders />
        </TaxesDashboard>
    );
};

export default SellOrdersView;