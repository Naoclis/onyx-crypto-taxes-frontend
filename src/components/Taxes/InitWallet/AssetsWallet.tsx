/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box, Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const AssetsWalletRow = (props: any) => {
    const { item } = props;

    //Functions

    //Render
    return (
        <TableRow>
            <TableCell>{item.exchange}</TableCell>
            <TableCell>{item.asset}</TableCell>
            <TableCell>{item.qty}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.timestamp}</TableCell>
        </TableRow>
    );
}

const AssetsWallet = (props: any) => {
    const { wallet, updateLog } = props;
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
                        <TableCell>Plateforme</TableCell>
                        <TableCell>Asset</TableCell>
                        <TableCell>Quantité</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Recette OK ?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {wallet.map((item: any, index: number) =>
                        <AssetsWalletRow key={index} item={item} updateLog={updateLog} />
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default AssetsWallet;