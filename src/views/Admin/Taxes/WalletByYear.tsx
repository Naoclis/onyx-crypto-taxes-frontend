/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Taxes from '../Taxes';
import WalletByYear from '../../../components/Taxes/WalletByYear';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const WalletByYearView = () => {
    const title = "Vision annuelle portefeuille";
    //Render
    return (
        <Taxes selectedMenuItem={title}>
            <WalletByYear />
        </Taxes>
    );
};

export default WalletByYearView;