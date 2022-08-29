/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
//Api
import ApiOperations from '../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const TableKpi = (props: any) => {
    const { table, name } = props;
    const { rejected, accepted } = table;
    //Render
    return (
        <Box>
            <h3>Staging Area : {name}</h3>
            Nombre de lignes valides : {accepted} - Nombre de lignes en erreur : {rejected}
        </Box>
    );
};

const ControlStagingArea = () => {
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
    const [isOKForInsertion, setIsOKForInsertion] = useState<number>(0);
    //Functions
    const init = async () => {
        setInProgress(1);
        setIsOKForInsertion(0);
        const res = await apiCaller.get('validate/stagingArea', 'databaseValidator');
        if (res !== undefined) {
            setTablesKpi(res.results);
            setInProgress(-1);
            displayButtonToUploadDefinitiveTables();
        }
    };

    const displayButtonToUploadDefinitiveTables = () => {
        let totalRejected = 0;
        for (const market in tablesKpi) {
            const { rejected } = tablesKpi[market];
            totalRejected += rejected;
        }
        const isOK = (totalRejected === 0) ? 1 : 0;
        setIsOKForInsertion(isOK);
    };

    const migrateStagingToStableTables = async () => {
        setInProgress(1);
        const res = await apiCaller.get('transactions/fromStagingToDefinitive', 'loader');
        if (res !== undefined) {
            console.log(res);
            setInProgress(-1);
        }
    };

    const emptyStagingTables = async () => {
        const res = await apiCaller.get('emptyDB/staging', 'debugger');
        if (res !== undefined) {
            console.log(res);
        }
    };

    const emptyDefinitiveTables = async () => {
        const res = await apiCaller.get('emptyDB/definitive', 'debugger');
        if (res !== undefined) {
            console.log(res);
        }
    };

    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" sx={{ '> .MuiButtonBase-root': {marginRight:'1em'}}}>
                    <Button variant='contained' onClick={emptyStagingTables}>Vider Staging Tables</Button>
                    <Button variant='contained' onClick={emptyDefinitiveTables}>Vider les tables définitives</Button>
                    {inProgress === -1 && isOKForInsertion &&
                        <Button variant='contained' onClick={migrateStagingToStableTables}>Charger les tables définitives</Button>
                    }
                    {inProgress === 1 &&
                        <Loader message="Action en cours" />
                    }
                </Box>
                {tablesKpi !== undefined &&
                    <Box>
                        <TableKpi table={tablesKpi.future} name='Future' />
                        <TableKpi table={tablesKpi.spot} name='Spot' />
                        <TableKpi table={tablesKpi.staking} name='Staking' />
                        <TableKpi table={tablesKpi.coldWallet} name='Cold Wallet' />
                    </Box>
                }

            </Grid>
        </Grid>
    );
};

export default ControlStagingArea;