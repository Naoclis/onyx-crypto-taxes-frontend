/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const ExportLawyer = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [inProgress, setInProgress] = useState<number>(-1);
    const [year, setYear] = useState<string>('2022');
    //Functions
    const init = async () => {
        setInProgress(1);
        //let res = await apiCaller.get('get/assetsEvolution/byYear', 'taxesCalculator');
        //if (res !== undefined) {
        //    setYearWalletViews(res.views);
        //}
        setInProgress(-1);
    };

    const createExport = async () => {
        setInProgress(1);
        const res = await apiCaller.get(`generate/assetsEvolution/forLawyer/${year}`, 'taxesCalculator');
        if (res !== undefined) {
            console.log(res);
        }
        setInProgress(-1);
    };

    //Pour fixer l'année de calcul
    const updateYear = (event: any) => {
        const value = event.target.value;
        setYear(value);
    }

    //Effects
    //useEffect(() => {
    //    init();
    //}, []);

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <h3>Génération de l'export pour l'avocat, Maître Uzan</h3>
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
                </ol>
                <Box mt={2} mb={2} display="flex" alignItems="center">
                    <Box mr={2}>Précisez l'année sur laquelle lancer les calculs :</Box>
                    <TextField label="Année de calcul" variant="outlined" value={year} onChange={updateYear} />
                    <Box ml={2}>
                        <Button variant="contained" onClick={createExport}>Créer Export</Button>
                    </Box>
                </Box>

            </Grid>
            {inProgress === 1 &&
                <Grid item xs={12}>
                    <Loader message="Action en cours" />
                </Grid>
            }
            {inProgress !== 1 &&
                <Grid item xs={12}>
                    OK
                </Grid>
            }


        </Grid>
    );
};

export default ExportLawyer;