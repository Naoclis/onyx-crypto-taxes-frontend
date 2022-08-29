/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const FilesAlreadyLoaded = (props: any) => {
    const { files } = props;

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
                    <TableCell>Statut</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {files.map((file: any, index: number) =>
                    <React.Fragment key={index}>
                        <TableRow className={(index % 2 === 1) ? 'odd': 'even'}>
                            <TableCell>{file.name}</TableCell>
                            <TableCell>{file.source}</TableCell>
                            <TableCell>{file.type}</TableCell>
                            <TableCell>{file.readablePeriod}</TableCell>
                            <TableCell>{file.nbLines}</TableCell>
                            <TableCell>{file.comment}</TableCell>
                        </TableRow>
                        <TableRow className={(index % 2 === 1) ? 'odd' : 'even'}>
                            <TableCell colSpan={6}>Source : {file.parent.name}</TableCell>
                        </TableRow>
                    </React.Fragment>
                )}
            </TableBody>
        </Table>
    );
};

export default FilesAlreadyLoaded;