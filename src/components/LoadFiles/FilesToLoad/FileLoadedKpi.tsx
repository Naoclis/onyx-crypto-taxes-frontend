/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const FileLoadedKPI = (props: any) => {
    const { file, lines, market } = props.res;

    const setKpis = () => {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nb de Lignes Rejetées</TableCell>
                        <TableCell>Nb de Lignes Conservées</TableCell>
                        <TableCell>Nb de Transactions Créées</TableCell>
                        <TableCell>Nb de Transactions à Insérer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{lines.rejectedLines.length}</TableCell>
                        <TableCell>{lines.keepedLines.length}</TableCell>
                        <TableCell>{lines.identifiedTransactions.length}</TableCell>
                        <TableCell>{lines.transactionsToInsert.length}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    };

    //Render
    return (
        <Box sx={{ border: '2px solid pink' }} p={2}>
            <h4>Fichier Chargé avec succcès</h4>
            Nom du fichier : {file}<br />
            Marché : {market}<br />
            {(lines.rejectedLines !== undefined) ? setKpis() : <p>Tout le fichier est en rejet. Cela peut etre normal pour les fichiers Binance Transactions</p>}
        </Box>
    );
};

export default FileLoadedKPI;