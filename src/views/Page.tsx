/********** [  LIBRARIES  ] ***************/
import React, { memo } from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import MainMenu from '../components/Menus/MainMenu';
/********** [ PROPERTIES ] ****************/


/*********** [ COMPONENT ] ****************/
const Page = (props: any) => {
    //Render
    return (
        <Box>
            <MainMenu />
            {props.children}            
        </Box>
    );
};

export default memo(Page);