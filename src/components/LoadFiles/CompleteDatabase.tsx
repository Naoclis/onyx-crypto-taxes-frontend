/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import StagingTablesChecker from './CompleteDatabase/StagingTableChecker';
//Api
import ApiOperations from '../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const CompleteDatabase = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [inProgress, setInProgress] = useState<number>(-1);
    const [tablesKpi, setTablesKpi] = useState<any>(
        {
            "future": { "rejected": 0, "accepted": 0 },
            "spot": { "rejected": 0, "accepted": 0 },
            "staking": { "rejected": 0, "accepted": 0 },
            "coldWallet": { "rejected": 0, "accepted": 0 }
        }
    );
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('validate/stagingArea', 'databaseValidator');
        if (res !== undefined) {
            setTablesKpi(res.results);
            setInProgress(-1);
        }
    };

    const loadManualFilesIntoTables = async () => {
        const res = await apiCaller.get(`transactionsFile/handleManualFiles/insert`, 'loader');
        if (res !== undefined) {
            console.log(res);
        }
    };

    const deleteManualFilesFromTables = async () => {
        const res = await apiCaller.get(`transactionsFile/handleManualFiles/remove`, 'loader');
        if (res !== undefined) {
            console.log(res);
        }
    };


    const emptyTables = async (mode: string) => {
        const res = await apiCaller.get(`emptyDB/${mode}`, 'debugger');
        if (res !== undefined) {
            console.log(res);
        }
    };


    //Effects
    useEffect(() => {
        //init();
    }, []);

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
                    <Button variant='contained' onClick={loadManualFilesIntoTables}>Charger les fichiers manuels</Button>
                    <Button variant='contained' onClick={deleteManualFilesFromTables}>Effacer les fichiers manuels</Button>
                    </Box>
                }
                {tablesKpi !== undefined &&
                    <StagingTablesChecker tablesKpi={tablesKpi} />
                }
            </Grid>
            <Grid item xs={12}>
                <h1>Gestion de la base</h1>
                <h3>Pour vider les tables</h3>
                <Box display="flex" sx={{ '> .MuiButtonBase-root': { marginRight: '1em' } }}>
                    <Button variant='contained' onClick={() => emptyTables('all')}>Vider toutes les tables</Button>
                    <Button variant='contained' onClick={() => emptyTables('staging')}>Vider Staging Tables</Button>
                    <Button variant='contained' onClick={() => emptyTables('definitive')}>Vider les tables définitives</Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default CompleteDatabase;
;