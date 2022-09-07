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
    const { taxes, testingTaxes } = props;

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <TaxesByYear taxes={taxes} testingTaxes={testingTaxes}/>
            </Grid>
        </Grid>
    );
};

export default TaxesTab;