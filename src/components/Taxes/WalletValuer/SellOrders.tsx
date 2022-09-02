/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box, Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const SellOrders = (props: any) => {
    const { orders } = props;
    //Variables

    //States
    //Functions


    //Effects
    //Render
    return (
        <Table sx={defaultStyles.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Temps</TableCell>
                    <TableCell>Qté</TableCell>
                    <TableCell>Qté</TableCell>
                    <TableCell>Montant</TableCell>
                    <TableCell>Montant</TableCell>
                    <TableCell>Frais</TableCell>
                    <TableCell>Frais</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orders.map((item: any, index: number) =>
                    <TableRow key={index}>
                        <TableCell>{item.transactionDate}</TableCell>
                        <TableCell>{item.transactionTimestamp}</TableCell>                        
                        <TableCell>{item.amount.value}</TableCell>
                        <TableCell>{item.amount.asset}</TableCell>
                        <TableCell>{item.qty.value}</TableCell>
                        <TableCell>{item.qty.asset}</TableCell>
                        <TableCell>{item.fee.value}</TableCell>
                        <TableCell>{item.fee.asset}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default SellOrders;