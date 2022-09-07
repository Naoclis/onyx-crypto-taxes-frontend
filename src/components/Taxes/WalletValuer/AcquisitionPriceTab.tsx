/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import AcquisitionPriceByYear from './AcquisitionPrice/AcquisitionPriceByYear';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const AcquisitionPriceTab = (props: any) => {
    const { ldyStates } = props;

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <AcquisitionPriceByYear ldyStates={ldyStates} />
            </Grid>
        </Grid>
    );
};

export default AcquisitionPriceTab;