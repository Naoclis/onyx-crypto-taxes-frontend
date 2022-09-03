/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import SellOrdersByYear from './WalletValuer/SellOrdersByYear';
import WalletValorization from './WalletValuer/WalletValorization';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/



const WalletValuer = (props:any) => {

    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [sellOrders, setSellOrders] = useState([]);
    const [walletValor, setWalletValor] = useState([]);
    const [inProgress, setInProgress] = useState<number>(-1);
    const [tabDisplayed, setTabDisplayed] = useState<number>(1);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/walletValor/sellOrders', 'taxesCalculator');
        if (res !== undefined) {
            const { orders, states, walletValor } = res;
            setSellOrders(orders);
            setWalletValor(walletValor);
            setInProgress(-1);
        }
    };

    const callAPI = async (action:string) => {
        setInProgress(1);
        const res = await apiCaller.get(action, 'taxesCalculator');
        if (res !== undefined) {
            console.log(res);
            setInProgress(-1);
        }
    };

    const getFIATSellOrders = async () => {
        await callAPI('generate/walletValor/sellOrders');
    };

    const getPriceFiles = async () => {
        await callAPI('generate/walletValor/prices');
    };


    const updateTab = (index:number) => {
        setTabDisplayed(index);
    };


    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <Box mb={2} mt={2} sx={{ '& > .MuiButtonBase-root': { marginRight: '1em' }}}>
                    <Button variant="contained" onClick={() => updateTab(0)}>Cessions</Button>
                    <Button variant="contained" onClick={() => updateTab(1)}>Etat Portefeuille Par Cession</Button>
                    <Button variant="contained" onClick={() => updateTab(2)}>Synthèse</Button>
                </Box>
                <Box>
                    Calcul de la valeur globale du portefeuille à chaque cession imposable.
                    Pour chaque cession en FIAT
                </Box>
                <Box mb={2} mt={2} sx={{ '& > .MuiButtonBase-root': { marginRight: '1em' } }}>
                    <Button variant="contained" onClick={getFIATSellOrders}>Identification Ordres de Vente FIAT</Button>
                    <Button variant="contained" onClick={getPriceFiles}>Récupération des fichiers de prix</Button>
                </Box>

                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {tabDisplayed === 0 && <SellOrdersByYear orders={sellOrders} />}
                {tabDisplayed === 1 && <WalletValorization valuedStates={walletValor} />}
            </Grid>
            <Grid item xs={6}>
                {tabDisplayed === 1 && <WalletValorization valuedStates={walletValor} onlySummed/>}
            </Grid>
        </Grid>
    );
};

export default WalletValuer;