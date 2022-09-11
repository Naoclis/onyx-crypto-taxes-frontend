/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

import Loader from '../../components/UIElements/Loader';
import WalletValorization from './Valorizations/WalletValorization';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const Valorizations = () => {

    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [inProgress, setInProgress] = useState<number>(-1);
    const [walletValor, setWalletValor] = useState([]);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/walletValor/valorizations', 'taxesCalculator');
        if (res !== undefined) {
            setWalletValor(res.walletValor);
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
                <h4>Vision détaillée de la valorisation du portefeuille par année</h4>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <WalletValorization valuedStates={walletValor} />
                }
                
            </Grid>
            <Grid item xs={6}>
                <h4>Vision agrégée de la valorisation du portefeuille par année</h4>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <WalletValorization valuedStates={walletValor} onlySummed />
                }
               
            </Grid>
        </Grid>
    );
};

export default Valorizations;