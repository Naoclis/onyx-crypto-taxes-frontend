/********** [  LIBRARIES  ] ***************/
import React, { memo, useState } from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Page from '../Page';
import Menu from '../../components/Menus/Menu';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const LoadFiles = (props: any) => {
    const { selectedMenuItem } = props;
    const menuItems = [
        { url: "/admin/taxes/init", label: "Création du portefeuille" },
        { url: "/admin/taxes/stateByYear", label: "Vision annuelle portefeuille" },
        { url: "/admin/taxes/compareStateByYear", label: "Comparaison Ordres Portefeuille" },
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

export default memo(LoadFiles);