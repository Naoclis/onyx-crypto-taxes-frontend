/********** [  LIBRARIES  ] ***************/
import React, { memo, useState } from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Page from '../Page';
import Menu from '../../components/Menus/Menu';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const Load = (props: any) => {
    const { selectedMenuItem } = props;
    const menuItems = [
        { url: "/admin/loadFiles", label: "Chargement des fichiers" },
        { url: "/admin/controlFiles", label: "Contrôle des fichiers" },
        { url: "/admin/controlDatabase", label: "Contrôle des données" },
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

export default memo(Load);