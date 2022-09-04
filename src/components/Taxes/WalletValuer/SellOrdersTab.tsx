/********** [  LIBRARIES  ] ***************/
import React from 'react';
import {  Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import SellOrdersByYear from './SellOrders/SellOrdersByYear';
//Api

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const SellOrdersTab = (props: any) => {
    const { orders } = props;

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={10}>
                <SellOrdersByYear orders={orders} />
            </Grid>
            <Grid item xs={2}>
                Rien ici pour le moment
            </Grid>
        </Grid>
    );
};

export default SellOrdersTab;