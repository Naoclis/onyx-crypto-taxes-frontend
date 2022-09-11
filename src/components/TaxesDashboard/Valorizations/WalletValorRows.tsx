/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const WalletValorRows = (props: any) => {
    const { num, rows } = props;
    //Variables
    const sum = rows.reduce((prev: any, curr: any) => (prev + curr.value), 0);
    //States
    //Functions

    //Effects

    //Render
    return (
        <Table sx={defaultStyles.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Qté</TableCell>
                    <TableCell>Prix</TableCell>
                    <TableCell>Montant</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((item: any, index: number) =>
                    <TableRow key={index}>
                        <TableCell>{item.asset}</TableCell>
                        <TableCell>{item.qty.toFixed(2)}</TableCell>
                        <TableCell>{item.price.toFixed(2)}</TableCell>
                        <TableCell>{item.value.toFixed(2)}</TableCell>
                    </TableRow>
                )}
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell colSpan={2}>{sum.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Case 212 - Cession {num} </TableCell>
                    <TableCell colSpan={2}>{Math.round(sum)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default WalletValorRows;