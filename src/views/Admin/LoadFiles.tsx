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
        { url: "/admin/load/loadFiles", label: "Chargement des fichiers" },
        { url: "/admin/load/controlFiles", label: "Contrôle des fichiers" },
        { url: "/admin/load/controlDatabase", label: "Contrôle des stagings area" },
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