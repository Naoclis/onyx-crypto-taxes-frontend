/********** [  LIBRARIES  ] ***************/
import React from 'react';
import {  Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import BuyOrdersByYear from './BuyOrders/BuyOrdersByYear';
//Api

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const BuyOrdersTab = (props: any) => {
    const { orders } = props;

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <BuyOrdersByYear orders={orders} />
            </Grid>
            <Grid item xs={6}>
                <BuyOrdersByYear orders={orders} onlySummed />
            </Grid>
        </Grid>
    );
};

export default BuyOrdersTab;