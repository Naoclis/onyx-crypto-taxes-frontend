/********** [  LIBRARIES  ] ***************/
import React, { memo } from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Page from '../Page';
import Menu from '../../components/Menus/Menu';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const Taxes = (props: any) => {
    const { selectedMenuItem } = props;
    const menuItems = [
        { url: "/taxes/init", label: "Création du portefeuille" },
        { url: "/taxes/prepare/wallet/stateByYear", label: "Vision annuelle portefeuille" },
        { url: "/taxes/check/wallet/compareStateByYear", label: "Comparaison Ordres Portefeuille" },
        { url: "/taxes/evaluate/wallet", label: "Valorisation du portefeuille" },
    ];
    //Render
    return (
        <Page>
            <Menu items={menuItems} selectedMenuItem={selectedMenuItem} />
            <Box m={2}>
                {props.children}
            </Box>
        </Page>
    );
};

export default memo(Taxes);