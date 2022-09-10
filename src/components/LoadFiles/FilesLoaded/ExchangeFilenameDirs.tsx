/********** [  LIBRARIES  ] ***************/
import React, { useState } from 'react';
import { Box, Button, Switch, TableCell, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import FileLoadedLines from './FileLoadedLines';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const ExchangeFilenameDir = (props: any) => {
    const { exchange, directory, setTransactionsFilesToLoad } = props;
    const { dirName, kpis, market, rejectedLines, transactionsFile } = directory;
    const { nbLines, nbTransactions } = kpis;
    //States
    const [isRejectedShown, showRejected] = useState<boolean>(false);
    const [checked, setChecked] = useState(false);


    //Functions  
    const toogleRejected = () => {
        showRejected(!isRejectedShown);
    };

    const deduceStatus = () => {
        const status = ((nbLines.rejected === 0) && (<Box sx={{ color: 'success.main' }}>OK pour insertion !</Box>))
            || ((nbLines.rejected !== 0) && (<Box sx={{ color: 'warning.main' }}>Rejets à contrôler !</Box>))
            || ((nbTransactions.toInsert === 0) && (<Box sx={{ color: 'info.main' }}>Fichier déjà inseré !</Box>))
            || (<Box sx={{ color: 'error.main' }}>Rien à dire</Box>);
        return status
    };

    const updateTransactionFilesList = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        setTransactionsFilesToLoad(`${dirName}/transactionsToInsert/${transactionsFile}`, market, event.target.checked);
    };

    //Render
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>{dirName.replace(`./src/assets/logs/${exchange}/`, '')}</TableCell>
                <TableCell>{market}</TableCell>
                <TableCell className='rejected'>
                    {(nbLines.rejected !== 0) ?
                        <Button onClick={toogleRejected}>Afficher Lignes</Button> :
                        <Box sx={{ color: 'secondary.main' }}>Aucun Rejet !</Box>
                    }
                </TableCell>
                <TableCell>{nbLines.rejected}</TableCell>
                <TableCell>{nbLines.keeped}</TableCell>
                <TableCell>{nbTransactions.identified}</TableCell>
                <TableCell>{nbTransactions.toInsert}</TableCell>
                <TableCell className='rejected'>{deduceStatus()}</TableCell>
                <TableCell><Switch checked={checked} onChange={updateTransactionFilesList} /></TableCell>
            </TableRow>
            {isRejectedShown &&
                <TableRow>
                    <TableCell colSpan={9}><FileLoadedLines lines={rejectedLines} market={market} exchange={exchange} /></TableCell>
                </TableRow>
            }

        </React.Fragment>
    );
};


export default ExchangeFilenameDir;