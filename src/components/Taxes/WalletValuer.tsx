/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import SellOrders from './WalletValuer/SellOrders';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/

const SellOrdersByYear = (props: any) => {
    const { year, orders } = props;
    //Render
    return (
        <Box mb={2}>
            <h1>Année : {year}</h1>
            <SellOrders orders={orders.filter((el:any) => el.year === year)} />
        </Box>
    );
};

const WalletValuer = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [sellOrders, setSellOrders] = useState([]);
    const [inProgress, setInProgress] = useState<number>(-1);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('generate/walletValor', 'taxesCalculator');
        if (res !== undefined) {
            setSellOrders(res.wallet);
            setInProgress(-1);
        }
    };

    const makeYears = () => {
        const yearViews : any = [];
        for (let year = 2017; year < 2023; year++) {
            yearViews.push(<SellOrdersByYear orders={sellOrders} year={year.toString()} />)
        }
        return yearViews;
    };


    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Box>
                    Calcul de la valeur globale du portefeuille à chaque cession imposable.
                    Pour chaque cession en FIAT
                </Box>

                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress === -1 &&
                    <Box mb={2}>
                    {makeYears()}
                    </Box>
                }
            </Grid>
        </Grid>
    );
};

export default WalletValuer;