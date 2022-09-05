/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const Debug = (props: any) => {
    const { rows } = props;
    //Variables
    //States
    //Functions

    //Effects
    //Render
    return (
        <Box>
            <Table sx={defaultStyles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Exchange</TableCell>
                        <TableCell>Account</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Qté</TableCell>
                        <TableCell>Qté Asset</TableCell>
                        <TableCell>Frais</TableCell>
                        <TableCell>Frais Asset</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item: any, index: number) =>
                        <TableRow key={index}>
                            <TableCell>{item.exchange}</TableCell>
                            <TableCell>{item.account}</TableCell>
                            <TableCell>{item.transactionDate}</TableCell>
                            <TableCell>{item.transactionTimestamp}</TableCell>
                            <TableCell>{item.qty.value}</TableCell>
                            <TableCell>{item.qty.asset}</TableCell>
                            <TableCell>{item.fee.value}</TableCell>
                            <TableCell>{item.fee.asset}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Debug;