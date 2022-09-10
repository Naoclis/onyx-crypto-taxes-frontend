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
                    <TableCell>Source</TableCell>
                    <TableCell>Période</TableCell>
                    <TableCell>Nb Lignes</TableCell>
                    <TableCell>Statut</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {files.map((file: any, index: number) =>
                    <React.Fragment key={index}>
                        <TableRow className={(index % 2 === 1) ? 'odd': 'even'}>                            
                            <TableCell>{file.parent.name}</TableCell>
                            <TableCell>{file.readablePeriod}</TableCell>
                            <TableCell>{file.nbLines}</TableCell>
                            <TableCell>{file.comment}</TableCell>
                        </TableRow>
                    </React.Fragment>
                )}
            </TableBody>
        </Table>
    );
};

export default FilesAlreadyLoaded;