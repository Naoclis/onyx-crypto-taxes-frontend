/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const FilesByExchange = (props: any) => {
    const { files, loadFile, rejectedFiles } = props;

    //Functions

    //Render
    return (
        <Table sx={defaultStyles.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Nom Fichier</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Période</TableCell>
                    <TableCell>Nb Lignes</TableCell>
                    <TableCell>Forcer Chargement Fichier</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {files.filter((el: any) => rejectedFiles.includes(el.name) === false).map((file: any, index: number) =>
                    <TableRow key={index}>
                        <TableCell>{
                            file
                                .name
                                .split('_')
                                .map((part: string, i: number) =>
                                    (<p key={i}>{part}{part.match('.csv') === null && '_'}<br/></p>)
                                )}
                        </TableCell>
                        <TableCell>{file.account}</TableCell>
                        <TableCell>{file.subAccount}</TableCell>
                        <TableCell>{file.readablePeriod}</TableCell>
                        <TableCell>{file.nbLines}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" onClick={() => loadFile(file)}>Charger</Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default FilesByExchange;