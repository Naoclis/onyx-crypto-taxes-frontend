/********** [  LIBRARIES  ] ***************/
import React from 'react';
/********* [ MY LIBRARIES ] ***************/
//Components
import Taxes from '../Taxes';
import InitWallet from '../../../components/Taxes/InitWallet';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const ListFiles = () => {
    const title = "Création du portefeuille";
    //Render
    return (
        <Taxes selectedMenuItem={title}>
            <InitWallet />
        </Taxes>
    );
};

export default ListFiles;