/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const TaxesDashboard = () => {

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Box>
                    dashboard Impots
                </Box>
            </Grid>
        </Grid>
    );
};

export default TaxesDashboard;