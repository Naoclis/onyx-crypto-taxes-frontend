/********** [  LIBRARIES  ] ***************/
import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
//Api
import ApiOperations from '../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const CompleteDatabase = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [inProgress, setInProgress] = useState<number>(-1);

    //Functions
    const manageManualFiles = async (mode: string) => {
        setInProgress(1);
        const res = await apiCaller.get(`transactionsFile/handleManualFiles/${mode}`, 'loader');
        if (res !== undefined) {
            console.log(res);
            setInProgress(-1);
        }
    };

    const emptyTables = async (mode: string) => {
        const res = await apiCaller.get(`emptyDB/${mode}`, 'debugger');
        //if (res !== undefined) {
        //    console.log(res);
        //}
    };
    //Effects

    //Render
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h1>Gestion des fichiers manuels</h1>
                <h3>Pour ajouter des transactions de régularisation dans les tables, issus de portefeuille disparus ou obsolètes</h3>
                <h4>Les fichiers manuels ne seront pas insérés plusieurs fois : il y a une vérification de leur présence en table avant insertion.</h4>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <Box display="flex" sx={{ '> .MuiButtonBase-root': { marginRight: '1em' } }}>
                    <Button variant='contained' onClick={() => manageManualFiles('testing')}>Charger les fichiers tests</Button>
                    <br />
                    <Button variant='contained' onClick={() => manageManualFiles('neo')}>Charger le fichier NEO</Button>
                    <Button variant='contained' onClick={() => manageManualFiles('removeNeo')}>Effacer le fichier NEO</Button>
                    <br/>
                    <Button variant='contained' onClick={() => manageManualFiles('insert')}>Charger les fichiers manuels</Button>
                    <Button variant='contained' onClick={() => manageManualFiles('remove')}>Effacer les fichiers manuels</Button>
                    </Box>
                }
            </Grid>
            <Grid item xs={12}>
                <h1>Gestion de la base</h1>
                <h3>Pour vider les tables</h3>
                <Box display="flex" sx={{ '> .MuiButtonBase-root': { marginRight: '1em' } }}>
                    <Button variant='contained' onClick={() => emptyTables('all')}>Vider toutes les tables</Button>
                    <Button variant='contained' onClick={() => emptyTables('staging')}>Vider Staging Tables</Button>
                    <Button variant='contained' onClick={() => emptyTables('test')}>Vider les tables Testing</Button>
                    <Button variant='contained' onClick={() => emptyTables('definitive')}>Vider les tables définitives</Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default CompleteDatabase;
;