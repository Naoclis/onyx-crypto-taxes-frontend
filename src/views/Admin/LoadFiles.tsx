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
        { url: "/admin/files/load", label: "Chargement des fichiers" },
        { url: "/admin/files/control", label: "Contrôle des fichiers" },
        { url: "/admin/database/check", label: "Contrôle des stagings area" },
        { url: "/admin/database/complete", label: "Ajout Fichiers Manuels" },
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