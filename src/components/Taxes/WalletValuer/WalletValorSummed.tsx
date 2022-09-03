/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const WalletValorSummedRows = (props: any) => {
    const { num, date, rows } = props;
    //Variables
    const sum = rows.reduce((prev: any, curr: any) => (prev + curr.value), 0);
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

const WalletValorSummed = (props: any) => {
    const { valuedStateRows } = props;
    //Variables
    const sum = valuedStateRows.reduce((prev: any, curr: any) => {
        const assetsSum = curr.assets.reduce((_prev: any, _curr: any) => (_prev + _curr.value), 0);
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
                    <TableCell>Valeur globale du portefeuille au moment de la cession</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {valuedStateRows.map((state: any, index: number) =>
                    (<WalletValorSummedRows rows={state.assets} num={index + 1} date={state.date} key={index} />)
                )}
                <TableRow>
                    <TableCell colSpan={3}>Total : {sum.toFixed(2)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default WalletValorSummed;