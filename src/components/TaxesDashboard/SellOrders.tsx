/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

import Loader from '../../components/UIElements/Loader';
import SellOrdersByYear from './SellOrders/SellOrdersByYear';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const SellOrders = () => {

    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [inProgress, setInProgress] = useState<number>(-1);
    const [sellOrders, setSellOrders] = useState([]);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/walletValor/sellOrders', 'taxesCalculator');
        if (res !== undefined) {
            setSellOrders(res.sellOrders);
            setInProgress(-1);
        }
    };

    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <h4>Vision de toutes les cessions par année</h4>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <SellOrdersByYear orders={sellOrders} />
                }
                
            </Grid>
        </Grid>
    );
};

export default SellOrders;