/********** [  LIBRARIES  ] ***************/
import React, { memo } from 'react';
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
        { url: "/files/help", label: "Consignes de chargement des fichiers" },
        { url: "/files/load", label: "Chargement des fichiers" },
        { url: "/files/control", label: "Contrôle des fichiers" },
        { url: "/database/check", label: "Contrôle des stagings area" },
        { url: "/database/complete", label: "Ajout Fichiers Manuels" },
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