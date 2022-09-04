/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import WalletValorization from './WalletValorization/WalletValorization';
//Api

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const WalletValorizationTab = (props: any) => {
    const { valuedStates } = props;

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <WalletValorization valuedStates={valuedStates} />
            </Grid>
            <Grid item xs={6}>
                <WalletValorization valuedStates={valuedStates} onlySummed />
            </Grid>
        </Grid>
    );
};

export default WalletValorizationTab;