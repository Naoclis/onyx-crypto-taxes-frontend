/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Taxes from '../Taxes';
import OrderComparison from '../../../components/Taxes/OrderComparison';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const OrderComparisonView = () => {
    const title = "Comparaison Ordres Portefeuille";
    //Render
    return (
        <Taxes selectedMenuItem={title}>
            <OrderComparison />
        </Taxes>
    );
};

export default OrderComparisonView;