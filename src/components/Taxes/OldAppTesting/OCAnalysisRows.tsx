/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
//Api
/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/

const OCAnalysisRows = (props: any) => {
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
                        <TableCell>Date</TableCell>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Quantité</TableCell>
                        <TableCell>Id Table Source</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item: any, index: number) =>
                        <TableRow key={index}>
                            <TableCell>{item.exchange}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.timestamp}</TableCell>
                            <TableCell>{item.qty}</TableCell>
                            <TableCell>{item._id}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default OCAnalysisRows;