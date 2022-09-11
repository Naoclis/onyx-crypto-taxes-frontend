/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/

const TaxesCalculation = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States
    const [inProgress, setInProgress] = useState<number>(-1);

    //Functions
    const init = async () => {
        await callAPI('get/walletValor/missingPrices');
    }

    const updateAssetsEvolution = async () => {
        await callAPI('generate/assetsEvolution/all');
        await callAPI('generate/assetsEvolution/byYear');
    };

    const getFIATSellOrders = async () => {
        await callAPI('generate/walletValor/sellOrders');
    };

    const getPriceFiles = async () => {
        await callAPI('generate/walletValor/prices');
    };

    const calculateTaxes = async () => {
        await callAPI('generate/walletValor/calculateTaxes');
    };

    const callAPI = async (action: string) => {
        setInProgress(1);
        const res = await apiCaller.get(action, 'taxesCalculator');
        if (res !== undefined) {
            console.log(res);
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
                <h3>Procédure de calcul des plus-values</h3>
                <ol>
                    <li>
                        Déterminer l'évolution dans le temp du volume de chaque asset du portefeuille.<br />
                        Cela revient à lister, pour chaque asset, tous les achats/ventes, dépots, échanges, etc. qu'il a connu, pour avoir la vision à un instant T de sa quantité précise présente dans le portefeuille unique.<br />
                        Je créé ainsi une vision "portefeuille unique" <i>(assetsEvolution)</i>
                    </li>
                    <li>
                        Chaque cession FIAT nécessitant d'avoir la vision de la valeur du portefeuille au moment de la cession, il faut créer cette vision. Pour cela, je créé :
                        <ul>
                            <li>d'abord la vision de toutes les cessions FIAT de l'année <i>(fiatSellOrders)</i></li>
                            <li>
                                puis un état pour chaque année, qui contient le statut du volume de chaque asset à la date de chaque cession <i>(table fiatSellOrdersWalletStates)</i>
                            </li>
                        </ul>
                    </li>
                    <li>
                        J'utilise aussi la vue "portefeuille unique" pour me créer une vision du 01/01 de mon portefeuille et de sa constitution : c'est une vision simple qui montre la quantité de chaque asset en début d'année.
                        <i>(table fdyWalletStates)</i>
                    </li>
                    <li>
                        Une fois que j'ai la vision du portefeuille à la date de chaque cession, je calcule sa valorisation avec les fichiers que je génère depuis CoinMarketCap, via API.
                        <i>(table valorizationWalletStates)</i>
                    </li>
                    <li>
                        Enfin, une fois tous ces éléments réunis, je peux calculer les taxes sur les plus-values.<br />
                        Pour m'aider dans le calcul, je créé un aggrégat qui contient, pour chaque date de cession, la valeur du portefeuille et le prix d'acquisition total<i>(table agg_valorizationAndInvestments)</i>
                        <br />
                        Puis je réalise le calcul final des taxes<i>(table taxesStates)</i>
                    </li>
                </ol>
            </Grid>
            {inProgress === 1 &&
                <Grid item xs={12}>
                    <Loader message="Action en cours" />
                </Grid>
            }
            {inProgress !== 1 &&
                <React.Fragment>
                    <Grid item xs={3}>
                        <h3>Mise à jour du portefeuille unique</h3>
                        <ul>
                            <li>Table d'évolution des volumes d'assets</li>
                            <li>Table d'évolution des volumes d'assets au 01/01</li>
                        </ul>
                        <Box mt={2} display="flex" flexDirection="column" sx={{ '& .MuiButtonBase-root': { width: '100%', margin: '0.5em 0' } }} >
                            <Button variant="contained" onClick={updateAssetsEvolution}>Rafraîchir Suivi Evolution Assets</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <h3>Mise à jour des tables de travail</h3>
                        <ul>
                            <li>Table des ordres de ventes FIAT</li>
                            <li>Table de l'état du portefeuille à chaque ordre de vente</li>
                            <li>Tables des acquisitions à chaque ordre de vente (pour calcul prix acquisition)</li>
                        </ul>
                        <Box mt={2} display="flex" flexDirection="column" sx={{ '& .MuiButtonBase-root': { width: '100%', margin: '0.5em 0' } }} >
                            <Button variant="contained" onClick={getFIATSellOrders}>Rafraîchir Tables de travail</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <h3>Récupération des fichiers de prix</h3>
                        <Box mt={2} display="flex" flexDirection="column" sx={{ '& .MuiButtonBase-root': { width: '100%', margin: '0.5em 0' } }} >
                            <Button variant="contained" onClick={getPriceFiles}>Récupération des fichiers de prix</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <h3>Calcul final des impôts</h3>
                        <ul>
                            <li>Table de valorisation du portefeuille</li>
                            <li>Table d'aggrégat qui contient, pour chaque ordre de vente, valorisation du portefeuille et prix d'acquistion</li>
                            <li>Tables de calcul des impôts</li>
                        </ul>
                        <Box mt={2} display="flex" flexDirection="column" sx={{ '& .MuiButtonBase-root': { width: '100%', margin: '0.5em 0' } }} >
                            <Button variant="contained" onClick={calculateTaxes}>Calcul des impôts</Button>
                        </Box>
                    </Grid>
                </React.Fragment>
            }


        </Grid>
    );
};

export default TaxesCalculation;