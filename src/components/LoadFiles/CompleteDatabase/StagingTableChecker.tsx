/********** [  LIBRARIES  ] ***************/
import React, {  useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../../components/UIElements/Loader';
//Api
import ApiOperations from '../../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style
/*********** [ COMPONENT ] ****************/
const StagingTableChecker = (props: any) => {
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

const StagingTablesChecker = (props: any) => {
    const { tablesKpi } = props;

    //Render
    return (
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
                <StagingTableChecker table={tablesKpi.future} name='Future' />
                <StagingTableChecker table={tablesKpi.spot} name='Spot' />
                <StagingTableChecker table={tablesKpi.staking} name='Staking' />
                <StagingTableChecker table={tablesKpi.coldWallet} name='ColdWallet' />
            </TableBody>
        </Table>
    );
};

export default StagingTablesChecker;