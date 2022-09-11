/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const BuyOrders = (props: any) => {
    const { orders } = props;
    //Variables
    const adaptedOrders = orders.map((el: any) => {
        ['qty', 'amount', 'fee'].forEach((key: string) => el[key].value = parseFloat(el[key].value).toFixed(2));
        return el;
    });
    //States
    //Functions


    //Effects
    //Render
    return (
        <Table sx={defaultStyles.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Qté</TableCell>
                    <TableCell>Qté (asset)</TableCell>
                    <TableCell>Montant</TableCell>
                    <TableCell>Montant (asset)</TableCell>
                    <TableCell>Frais</TableCell>
                    <TableCell>Frais (asset)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {adaptedOrders.map((item: any, index: number) =>
                    <TableRow key={index}>
                        <TableCell>{item.transactionDate}</TableCell>
                        <TableCell>{item.qty.value}</TableCell>
                        <TableCell>{item.qty.asset}</TableCell>
                        <TableCell>{item.amount.value}</TableCell>
                        <TableCell>{item.amount.asset}</TableCell>
                        <TableCell>{item.fee.value}</TableCell>
                        <TableCell>{item.fee.asset}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default BuyOrders;