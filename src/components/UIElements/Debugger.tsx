/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const Debugger = (props: any) => {
    const { rows } = props;
    //Variables
    const total = rows.reduce((p: number, el: any) => (p + el.value), 0);
    //States
    //Functions


    //Effects
    //Render
    return (
        <Box>
            <Table sx={defaultStyles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Asset</TableCell>
                        <TableCell>Quantité</TableCell>
                        <TableCell>Prix</TableCell>
                        <TableCell>Valeur</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item: any, index: number) =>
                        <TableRow key={index}>
                            <TableCell>{item.asset}</TableCell>
                            <TableCell>{item.qty}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.value}</TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell colSpan={4}>{total}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};

export default Debugger;