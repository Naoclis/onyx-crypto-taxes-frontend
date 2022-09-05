/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const TaxesRow = (props: any) => {
    const { taxes } = props;

    const rows = (taxes.length > 0) ? taxes[0].taxes : [];
    const totalPnL = (rows.length > 0) ? rows.reduce((p: number, c: any) => (p + c.profitAndLoss), 0) : 0;
    //Variables

    //States
    //Functions


    //Effects
    //Render
    return (

        <Table sx={defaultStyles.table}>
            <TableHead>
                <TableRow>
                    <TableCell>N° de cession</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Heure</TableCell>
                    <TableCell>Valeur globale du portefeuille au moment de la cession</TableCell>
                    <TableCell>Prix de Cession</TableCell>
                    <TableCell>Frais de cession</TableCell>
                    <TableCell>Prix de cession net des frais</TableCell>
                    <TableCell>Soulte reçue ou versée lors de la cession</TableCell>
                    <TableCell>Prix de cession net des soultes</TableCell>
                    <TableCell>Prix de cession net des frais et soultes</TableCell>
                    <TableCell>Prix total d'acquisition</TableCell>
                    <TableCell>Fractions de capital initial contenues dans le prix total d'acquisition</TableCell>
                    <TableCell>Prix total d'acquisition net</TableCell>
                    <TableCell>Plus-values et moins-values</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((item: any, index: number) =>
                    <TableRow key={index}>
                        <TableCell>{item.num}</TableCell>
                        <TableCell>{item.day}</TableCell>
                        <TableCell>{item.hour}</TableCell>
                        <TableCell>{item.walletValue.toFixed()}</TableCell>
                        <TableCell>{item.amount.toFixed()}</TableCell>
                        <TableCell>{item.fee.toFixed()}</TableCell>
                        <TableCell>{item.amountWithoutFee.toFixed()}</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>{item.amountWithoutSoulte.toFixed()}</TableCell>
                        <TableCell>{item.netAmount.toFixed()}</TableCell>
                        <TableCell>{item.acquisitionPrice.toFixed()}</TableCell>
                        <TableCell>{item.capitalFraction.toFixed()}</TableCell>
                        <TableCell>{item.netAcquisitionPrice.toFixed()}</TableCell>
                        <TableCell>{item.profitAndLoss.toFixed(2)}</TableCell>
                    </TableRow>
                )}
                <TableRow>
                    <TableCell colSpan={13}>--------</TableCell>
                    <TableCell>{totalPnL.toFixed(2)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default TaxesRow;