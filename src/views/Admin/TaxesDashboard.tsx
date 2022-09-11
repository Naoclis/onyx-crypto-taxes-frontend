/********** [  LIBRARIES  ] ***************/
import React, { memo } from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Page from '../Page';
import Menu from '../../components/Menus/Menu';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const TaxesDashboard = (props: any) => {
    const { selectedMenuItem } = props;
    const menuItems = [
        { url: "/taxes/manage/sells", label: "Cessions" },
        { url: "/taxes/manage/valorizations", label: "Valorisations Portefeuille" },
        { url: "/taxes/manage/invests", label: "Investissements" },
        { url: "/taxes/manage/taxes", label: "Impôts" },
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

export default memo(TaxesDashboard);