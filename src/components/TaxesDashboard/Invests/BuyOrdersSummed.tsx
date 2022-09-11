/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const BuyOrdersSummedRows = (props: any) => {
    const { num, date, rows } = props;
    //Variables
    const sum = rows.reduce((prev: any, curr: any) => (prev + parseFloat(curr.amount.value)), 0);
    //States
    //Functions

    //Effects

    //Render
    return (
        <TableRow>
            <TableCell>{num}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{sum.toFixed(0)}</TableCell>
        </TableRow>
    );
};

const BuyOrdersSummed = (props: any) => {
    const { yearOrders } = props;
    //Variables
    const sum = yearOrders.reduce((prev: any, curr: any) => {
        const assetsSum = curr.orders.reduce((_prev: any, _curr: any) => (_prev + parseFloat(_curr.amount.value)), 0);
        return prev + assetsSum;
    }, 0);

    //States
    //Functions

    //Effects

    //Render
    return (
        <Table sx={defaultStyles.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Cession N°</TableCell>
                    <TableCell>Date et Heure de cession</TableCell>
                    <TableCell>Investissement cumulé EUR jusqu'à la cession</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {yearOrders.map((state: any, index: number) =>
                    (<BuyOrdersSummedRows rows={state.orders} num={index + 1} date={state.date} key={index} />)
                )}
                <TableRow>
                    <TableCell colSpan={3}>Total : {sum.toFixed(2)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default BuyOrdersSummed;