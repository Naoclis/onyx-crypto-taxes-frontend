/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import SellOrdersTab from './WalletValuer/SellOrdersTab';
import WalletValorizationTab from './WalletValuer/WalletValorizationTab';
import BuyOrdersTab from './WalletValuer/BuyOrdersTab';
import TaxesTab from './WalletValuer/TaxesTab';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const WalletValuer = (props: any) => {

    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [sellOrders, setSellOrders] = useState([]);
    const [walletValor, setWalletValor] = useState([]);
    const [buyOrders, setBuyOrders] = useState([]);
    const [taxes, setTaxes] = useState([]);
    const [inProgress, setInProgress] = useState<number>(-1);
    const [tabDisplayed, setTabDisplayed] = useState<number>(3);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/walletValor/sellOrders', 'taxesCalculator');
        if (res !== undefined) {
            const { sellOrders, walletValor, buyOrders, taxes } = res;
            setSellOrders(sellOrders);
            setWalletValor(walletValor);
            setBuyOrders(buyOrders);
            setTaxes(taxes);
            setInProgress(-1);
        }
    };

    const callAPI = async (action: string) => {
        setInProgress(1);
        const res = await apiCaller.get(action, 'taxesCalculator');
        if (res !== undefined) {
            console.log(res);
            setInProgress(-1);
        }
    };

    const getFIATSellOrders = async () => {
        await callAPI('generate/walletValor/sellOrders');
        await init();
    };

    const getPriceFiles = async () => {
        await callAPI('generate/walletValor/prices');
    };

    const calculateTaxes = async () => {
        await callAPI('generate/walletValor/calculateTaxes');
    };

    

    const updateTab = (index: number) => {
        setTabDisplayed(index);
    };


    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Box mb={2} mt={2} sx={{ '& > .MuiButtonBase-root': { marginRight: '1em' } }}>
                    <Button variant="contained" onClick={() => updateTab(0)}>Cessions</Button>
                    <Button variant="contained" onClick={() => updateTab(1)}>Etat Portefeuille Par Cession</Button>
                    <Button variant="contained" onClick={() => updateTab(2)}>Ordre d'Acquisition Par Cession</Button>
                    <Button variant="contained" onClick={() => updateTab(3)}>Synthèse</Button>
                </Box>

                <Box mb={2} mt={2} sx={{ '& > .MuiButtonBase-root': { marginRight: '1em' } }}>
                    <Button variant="contained" onClick={getFIATSellOrders}>Mise à jour des tables de travail</Button>
                    <Button variant="contained" onClick={getPriceFiles}>Récupération des fichiers de prix</Button>
                    <Button variant="contained" onClick={calculateTaxes}>Calcul des impôts</Button>
                    
                </Box>
            </Grid>
            <Grid item xs={12}>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress === -1 &&
                    <React.Fragment>
                        {tabDisplayed === 0 && <SellOrdersTab orders={sellOrders} />}
                        {tabDisplayed === 1 && <WalletValorizationTab valuedStates={walletValor} />}
                    {tabDisplayed === 2 && <BuyOrdersTab orders={buyOrders} />}
                    {tabDisplayed === 3 && <TaxesTab taxes={taxes} />}
                    </React.Fragment>
                }                
            </Grid>
        </Grid>
    );
};

export default WalletValuer;