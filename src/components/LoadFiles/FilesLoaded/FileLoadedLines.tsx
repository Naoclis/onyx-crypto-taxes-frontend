/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import { futureHeader, spotHeader, binanceOldTransactionHeader, binanceTransactionHeader } from '../../../assets/variables';
/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles, palette } from '../../../assets/styles/theme';
const styles = {
    ...defaultStyles,
    table: {
        'tr td': {
            backgroundColor: palette.primary.light,
            color: palette.background.black
        },
        'tr th': {
            backgroundColor: palette.primary.main,            
        },
    }
};

/*********** [ COMPONENT ] ****************/
const FileLoadedLines = (props: any) => {
    const { lines, exchange, market } = props;
    const header = (['Future'].includes(market) && futureHeader)
        || (['Spot'].includes(market) && spotHeader)
        || (exchange === 'Binance' && market === 'OldTransactions' && binanceOldTransactionHeader)
        || (exchange === 'Binance' && market === 'Transactions' && binanceTransactionHeader)
        || [{ label: `ENTENTE NON DEFINI POUR CE MARCHE : ${market}`, index: 0 }];
    
    //Render
    return (
        <Table sx={styles.table}>
            <TableHead>
                <TableRow>
                    {header.map((el: any) => el.label).map((field: any, index: number) =>
                        <TableCell key={index}>{field}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {lines.map((line: any, index: number) =>
                    <TableRow key={index}>
                        {header.map((el: any) => el.index).map((fieldIndex: number, index: number) =>
                            <TableCell key={index}>{line[fieldIndex]}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default FileLoadedLines;