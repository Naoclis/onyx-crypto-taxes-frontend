/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const AcquisitionPrice = (props: any) => {
    const { ldyStates } = props;
    //Variables
    //const adaptedOrders = orders.map((el: any) => {
    //    ['qty', 'amount', 'fee'].forEach((key: string) => {
    //        el[key].value = parseFloat(el[key].value).toFixed(2);
    //        el[key].originalValue = parseFloat(el[key].originalValue).toFixed(2);
    //    });
    //    return el;
    //});
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
                    <TableCell>Taux de change</TableCell>
                    <TableCell>Montant origine</TableCell>
                    <TableCell>Frais origine</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {ldyStates.map((item: any, index: number) =>
                    <TableRow key={index}>
                        <TableCell>{item.transactionDate}</TableCell>
                        <TableCell>{item.amount.value}</TableCell>
                        <TableCell>{item.amount.asset}</TableCell>
                        <TableCell>{item.qty.value}</TableCell>
                        <TableCell>{(item.qty.conversionType === 'USD->EUR') ? 'EUR' : item.qty.asset}</TableCell>
                        <TableCell>{item.fee.value}</TableCell>
                        <TableCell>{(item.fee.conversionType === 'USD->EUR') ? 'EUR' : item.fee.asset}</TableCell>
                        <TableCell>{Math.round(1 / item.qty.changeRate * 10000) / 10000}</TableCell>
                        <TableCell>{(item.qty.conversionType === 'USD->EUR') && `${item.qty.originalValue} USD`}</TableCell>
                        <TableCell>{(item.fee.conversionType === 'USD->EUR') && `${item.fee.originalValue} USD`}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default AcquisitionPrice;