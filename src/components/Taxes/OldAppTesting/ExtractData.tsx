/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Debugger from '../../../components/UIElements/Debugger';
import Loader from '../../../components/UIElements/Loader';
//Api
import ApiOperations from '../../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const ExtractData = () => {

    //Variables
    const apiCaller = new ApiOperations();
    //States
    const [inProgress, setInProgress] = useState<number>(-1);

    const [date, setDate] = useState('2020-11-07 00:20:01');
    const [rows, setRows] = useState([]);
    //Functions
    //
    const updateDate = (event: any) => {
        const value = event.target.value;
        setDate(value);
    }

    const getExtract = async () => {
        setInProgress(1);
        const res = await apiCaller.post('extract/fromDate', { date: date }, 'taxesCalculator');
        if (res !== undefined) {
            setRows(res.extract);
        }
        setInProgress(-1);
    }

    //Effects
    //Render
    return (
        <Grid item xs={12}>
            <h2>Afficher la valorisation du portefeuille pour une date donnée</h2>
            Consignes :
            <ul>
                <li>La date saisie doit correspondre à une date de cession FIAT</li>
                <li>Elle doit respectée scrupuleusement le format YYYY-MM-DD HH:II:SS</li>
            </ul>
            L'application va retourner les lignes correspondantes de la table <i>valorizationWalletStates</i><br />
            Je me suis servi de cela pour trouver les causes des différences de valorisation entre ma nouvelle appli, l'ancienne mais aussi des éléments produits par l'avocat Maitre Uzan.
            <Box mt={2} mb={2} display="flex">
                <TextField label="Date de cession" variant="outlined" value={date} onChange={updateDate} />
                <Button variant="contained" onClick={getExtract}>Demander Extract</Button>
            </Box>

            {inProgress === 1 &&
                <Box mb={2}>
                    <Loader message="Action en cours" />
                </Box>
            }
            {inProgress !== 1 &&
                <Debugger rows={rows} />
            }




        </Grid>
    );
};

export default ExtractData;

