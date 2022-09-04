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
    const { taxes } = props;

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={10}>
                <TaxesByYear taxes={taxes} />
            </Grid>
            <Grid item xs={2}>
                Rien ici pour le moment
            </Grid>
        </Grid>
    );
};

export default TaxesTab;