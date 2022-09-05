/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/

const LDYWallet = (props: any) => {
    const { state } = props;

    //Render
    return (
        <Table sx={defaultStyles.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Prix d'acquisition au 31/12 de l'année précécente</TableCell>
                    <TableCell>Détails</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {state.map((item: any, index: number) =>
                    <TableRow key={index}>
                        <TableCell>{item.acquisitionPrice.toFixed(2)}</TableCell>
                        <TableCell>{item.assets.length}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default LDYWallet;