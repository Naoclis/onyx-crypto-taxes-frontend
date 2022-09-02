/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Taxes from '../Taxes';
import WalletValuer from '../../../components/Taxes/WalletValuer';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const WalletValuerView = () => {
    const title = "Valorisation du portefeuille";
    //Render
    return (
        <Taxes selectedMenuItem={title}>
            <WalletValuer />
        </Taxes>
    );
};

export default WalletValuerView;