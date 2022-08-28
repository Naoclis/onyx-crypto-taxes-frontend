/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Page from '../Page';
/********** [ PROPERTIES ] ****************/
//Style
import { theme } from '../../assets/styles/theme';

const styles = {
    admin: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
};

/*********** [ COMPONENT ] ****************/
const Help = () => {

    return (
        <Page>
            <h1>Help</h1>
            <Box sx={styles.admin}>
                Bonjour
            </Box>
        </Page>
    );
};

export default Help;