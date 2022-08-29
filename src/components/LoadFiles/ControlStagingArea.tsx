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
    //Variables
    const apiCaller = new ApiOperations();
    const { table, name } = props;
    const { rejected, accepted } = table;
    //States    
    const [inProgress, setInProgress] = useState<number>(-1);

    //Functions
    const migrateStagingToStableTables = async () => {
        setInProgress(1);
        const res = await apiCaller.get(`transactions/fromStagingToDefinitive/${name}`, 'loader');
        if (res !== undefined) {
            console.log(res);
            setInProgress(-1);
        }
    };

    //Render
    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{accepted}</TableCell>
            <TableCell>{rejected}</TableCell>
            <TableCell>
                {inProgress === -1 && (rejected === 0) &&
                    <Button variant='contained' onClick={migrateStagingToStableTables}>Charger la table définitive : {name.toUpperCase()}</Button>
                }
                {inProgress === 1 &&
                    <Loader message="Action en cours" />
                }
            </TableCell>
        </TableRow>
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
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('validate/stagingArea', 'databaseValidator');
        if (res !== undefined) {
            setTablesKpi(res.results);
            setInProgress(-1);
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
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                <Box display="flex" sx={{ '> .MuiButtonBase-root': { marginRight: '1em' } }}>
                    <Button variant='contained' onClick={() => emptyTables('all')}>Vider toutes les tables</Button>
                    <Button variant='contained' onClick={() => emptyTables('staging')}>Vider Staging Tables</Button>
                    <Button variant='contained' onClick={() => emptyTables('definitive')}>Vider les tables définitives</Button>
                </Box>
                {tablesKpi !== undefined &&
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom Table</TableCell>
                                <TableCell>Nb Lignes OK</TableCell>
                                <TableCell>Nb Lignes KO</TableCell>
                                <TableCell>Prêt pour insertion ?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableKpi table={tablesKpi.future} name='Future' />
                            <TableKpi table={tablesKpi.spot} name='Spot' />
                            <TableKpi table={tablesKpi.staking} name='Staking' />
                            <TableKpi table={tablesKpi.coldWallet} name='ColdWallet' />
                        </TableBody>
                    </Table>
                }
            </Grid>
        </Grid>
    );
};

export default ControlStagingArea;