/********** [  LIBRARIES  ] ***************/
import React, { useState } from 'react';
import { Box, Link, Switch, TableCell, TableRow } from '@mui/material';
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
    const [checked, setChecked] = React.useState(false);


    //Functions  
    const toogleRejected = () => {
        showRejected(!isRejectedShown);
    };

    const deduceStatus = () => {
        const status = ((nbLines.rejected === 0) && 'OK pour insertion !')
            || ((nbLines.rejected !== 0) && 'Rejets à contrôler !')
            || ((nbTransactions.toInsert === 0) && 'Fichier déjà inseré !')
            || 'Rien à dire';
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
                        <Link href='#' onClick={toogleRejected}>Afficher Lignes</Link> :
                        <Box sx={{ color:'secondary.main' }}>Aucun Rejet !</Box>
                    }
                </TableCell>
                <TableCell>{nbLines.rejected}</TableCell>
                <TableCell>{nbLines.keeped}</TableCell>
                <TableCell>{nbTransactions.identified}</TableCell>
                <TableCell>{nbTransactions.toInsert}</TableCell>
                <TableCell>{deduceStatus()}</TableCell>
                <TableCell><Switch checked={checked} onChange={updateTransactionFilesList} /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={9}>{isRejectedShown && <FileLoadedLines lines={rejectedLines} market={market} exchange={exchange} />}</TableCell>
            </TableRow>

        </React.Fragment>
    );
};


export default ExchangeFilenameDir;