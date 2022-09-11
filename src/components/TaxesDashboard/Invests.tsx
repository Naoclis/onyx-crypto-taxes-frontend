/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import BuyOrdersByYear from './Invests/BuyOrdersByYear';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const Invests = () => {

    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [inProgress, setInProgress] = useState<number>(-1);
    const [buyOrders, setBuyOrders] = useState([]);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/walletValor/invests', 'taxesCalculator');
        if (res !== undefined) {
            setBuyOrders(res.buyOrders);
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

            <Grid item xs={6}>
                <h4>Vision détaillée de toutes les investissements par année</h4>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <BuyOrdersByYear orders={buyOrders} />
                }                
            </Grid>
            <Grid item xs={6}>
                <h4>Vision aggrégée de toutes les investissements par année</h4>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <BuyOrdersByYear orders={buyOrders} onlySummed />
                }                
            </Grid>
        </Grid>
    );
};

export default Invests;