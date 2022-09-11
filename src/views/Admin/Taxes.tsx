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
        { url: "/taxes/help", label: "Consignes" },
        { url: "/taxes/calculate", label: "Calcul des impôts" },
        { url: "/taxes/check", label: "Recette (ancienne app)" },
        { url: "/taxes/export/uzan", label: "Vision Pour Avocat" },
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