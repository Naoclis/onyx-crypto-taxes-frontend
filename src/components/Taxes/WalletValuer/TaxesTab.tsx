/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import TaxesByYear from './Taxes/TaxesByYear';
//Api

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const TaxesTab = (props: any) => {
    const { taxes, ldyStates } = props;

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <TaxesByYear taxes={taxes} ldyStates={ldyStates}/>
            </Grid>
        </Grid>
    );
};

export default TaxesTab;