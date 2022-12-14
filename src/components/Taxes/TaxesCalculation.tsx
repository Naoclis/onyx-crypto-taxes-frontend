/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Grid, TextField, FormControl, FormGroup, FormLabel, FormControlLabel } from '@mui/material';
import { hexToRgb } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
//Api
import ApiOperations from '../../shared/apiOperations';


/********** [ PROPERTIES ] ****************/
//Style
import palette from '../../assets/styles/palette';
const styles = {
    actionBox: {
        borderRadius: '8px',
        border: `1px solid ${palette.primary.main}`,

        padding: '0.2em 0.5em',
        backgroundColor: `rgba(${hexToRgb(palette.blue[700]).replace('rgb(', '').replace(')', '')}, .2)`,
    }
};
/*********** [ COMPONENT ] ****************/
const ActionBox = (props: any) => {
    const { action, title, buttonLabel } = props;
    return (
        <Box sx={styles.actionBox}>
            <h3>{title}</h3>
            <Box sx={{ height: '150px' }}>
                {props.children}
            </Box>
            <Box mt={4} mb={2}>
                <Button variant="contained" onClick={action} fullWidth>{buttonLabel}</Button>
            </Box>
        </Box>
    )
};

const TaxesCalculation = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States
    const [inProgress, setInProgress] = useState<number>(-1);
    const [missingFiles, setMissingFiles] = useState([]);
    const [year, setYear] = useState<string>('2022');
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get(`generate/walletValor/missingPrices/${year}`, 'taxesCalculator');
        if (res !== undefined) {
            setMissingFiles(res.missingFiles);
        }
        setInProgress(-1);
    }

    const calculateAllForAllYears = async () => {
        for (let year = 2017; year < 2023; year++) {
            await calculateAllForYear(year.toString());
        }
    };

    const calculateAllForYear = async (year: string) => {
        await callAPI(`generate/assetsEvolution/all/${year}`);
        await callAPI(`generate/assetsEvolution/byYear/${year}`);
        await callAPI(`generate/walletValor/sellOrders/${year}`);
        await callAPI(`generate/walletValor/calculateTaxes/${year}`);
    };

    const updateAssetsEvolution = async () => {
        await callAPI(`generate/assetsEvolution/all/${year}`);
        await callAPI(`generate/assetsEvolution/byYear/${year}`);
    };

    const getFIATSellOrders = async () => {
        await callAPI(`generate/walletValor/sellOrders/${year}`);
    };

    const getPriceFiles = async () => {
        await callAPI(`generate/walletValor/prices/${year}`);
    };

    const calculateTaxes = async () => {
        await callAPI(`generate/walletValor/calculateTaxes/${year}`);
    };

    const callAPI = async (action: string) => {
        setInProgress(1);
        const res = await apiCaller.get(action, 'taxesCalculator');
        if (res !== undefined) {
            console.log(res);
        }
        setInProgress(-1);
    };

    //Pour fixer l'ann??e de calcul
    const updateYear = (event: any) => {
        const value = event.target.value;
        setYear(value);
    }


    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <h3>Proc??dure de calcul des plus-values</h3>
                <ol>
                    <li>
                        D??terminer l'??volution dans le temp du volume de chaque asset du portefeuille.<br />
                        Cela revient ?? lister, pour chaque asset, tous les achats/ventes, d??pots, ??changes, etc. qu'il a connu, pour avoir la vision ?? un instant T de sa quantit?? pr??cise pr??sente dans le portefeuille unique.<br />
                        Je cr???? ainsi une vision "portefeuille unique" <i>(assetsEvolution)</i>
                    </li>
                    <li>
                        Chaque cession FIAT n??cessitant d'avoir la vision de la valeur du portefeuille au moment de la cession, il faut cr??er cette vision. Pour cela, je cr???? :
                        <ul>
                            <li>d'abord la vision de toutes les cessions FIAT de l'ann??e <i>(fiatSellOrders)</i></li>
                            <li>
                                puis un ??tat pour chaque ann??e, qui contient le statut du volume de chaque asset ?? la date de chaque cession <i>(table fiatSellOrdersWalletStates)</i>
                            </li>
                        </ul>
                    </li>
                    <li>
                        J'utilise aussi la vue "portefeuille unique" pour me cr??er une vision du 01/01 de mon portefeuille et de sa constitution : c'est une vision simple qui montre la quantit?? de chaque asset en d??but d'ann??e.
                        <i>(table fdyWalletStates)</i>
                    </li>
                    <li>
                        Une fois que j'ai la vision du portefeuille ?? la date de chaque cession, je calcule sa valorisation avec les fichiers que je g??n??re depuis CoinMarketCap, via API.
                        <i>(table valorizationWalletStates)</i>
                    </li>
                    <li>
                        Enfin, une fois tous ces ??l??ments r??unis, je peux calculer les taxes sur les plus-values.<br />
                        Pour m'aider dans le calcul, je cr???? un aggr??gat qui contient, pour chaque year de cession, la valeur du portefeuille et le prix d'acquisition total<i>(table agg_valorizationAndInvestments)</i>
                        <br />
                        Puis je r??alise le calcul final des taxes<i>(table taxesStates)</i>
                    </li>
                </ol>
                <Box mt={2} mb={2} display="flex" alignItems="center">
                    <Box mr={2}>Pr??cisez l'ann??e sur laquelle lancer les calculs :</Box>
                    <TextField label="Ann??e de calcul" variant="outlined" value={year} onChange={updateYear} />
                    <Box ml={2}>
                        <Button variant="contained" onClick={() => calculateAllForYear(year)}>Calculer TOUT pour l'ann??e </Button>
                    </Box>
                    
                    <Box ml={2} display="flex" alignItems="center">
                        <Box mr={2}>OU</Box>
                        <Button variant="contained" onClick={calculateAllForAllYears}>TOUT Calculer pour TOUTES les ann??es</Button>
                    </Box>
                </Box>

            </Grid>
            {inProgress === 1 &&
                <Grid item xs={12}>
                    <Loader message="Action en cours" />
                </Grid>
            }
            {inProgress !== 1 &&
                <React.Fragment>
                    <Grid item xs={3}>
                        <ActionBox title="Mise ?? jour du portefeuille unique" action={updateAssetsEvolution} buttonLabel="Rafra??chir Suivi Evolution Assets">
                            <ul>
                                <li>Table d'??volution des volumes d'assets</li>
                                <li>Table d'??volution des volumes d'assets au 01/01</li>
                            </ul>
                        </ActionBox>
                    </Grid>
                    <Grid item xs={3}>
                        <ActionBox title="Mise ?? jour des tables de travail" action={getFIATSellOrders} buttonLabel="Rafra??chir Tables de travail">
                            <ul>
                                <li>Table des ordres de ventes FIAT</li>
                                <li>Table de l'??tat du portefeuille ?? chaque ordre de vente</li>
                                <li>Tables des acquisitions ?? chaque ordre de vente (pour calcul prix acquisition)</li>
                            </ul>
                        </ActionBox>
                    </Grid>
                    <Grid item xs={3}>
                        <ActionBox title="R??cup??ration des fichiers de prix" action={getPriceFiles} buttonLabel="R??cup??ration des fichiers de prix">
                            {missingFiles.length > 0 ?
                                <Alert severity="warning">Nb de fichiers de prix ?? r??cup??rer : {missingFiles.length}</Alert>
                                :
                                <Alert severity="success">Aucun fichier de prix ?? r??cup??rer !</Alert>
                            }
                        </ActionBox>
                    </Grid>
                    <Grid item xs={3}>
                        <ActionBox title="Calcul final des imp??ts" action={calculateTaxes} buttonLabel="Calcul des imp??ts">
                            <ul>
                                <li>Table de valorisation du portefeuille</li>
                                <li>Table d'aggr??gat qui contient, pour chaque ordre de vente, valorisation du portefeuille et prix d'acquistion</li>
                                <li>Tables de calcul des imp??ts</li>
                            </ul>
                        </ActionBox>
                    </Grid>
                </React.Fragment>
            }


        </Grid>
    );
};

export default TaxesCalculation;