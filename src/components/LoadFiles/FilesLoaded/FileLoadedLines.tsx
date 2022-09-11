/********** [  LIBRARIES  ] ***************/
import React, { useState } from 'react';
import { Alert, Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import { futureHeader, spotHeader, binanceOldTransactionHeader, binanceTransactionHeader, nexoHeader, coldWalletOtherHeader} from '../../../assets/configs/headerConfig';
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
    },
    listErrors: {
        background: 'black',
        textAlign: 'left',
        'li': {
            marginTop: '2px'
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
        || (['Staking'].includes(market) && nexoHeader)
        || (['OtherToken'].includes(market) && coldWalletOtherHeader)
        || [{ label: `ENTENTE NON DEFINI POUR CE MARCHE : ${market}`, index: 0 }];
    //States
    const [showedRows, showRows] = useState(false);


    //Functions
    const groupLinesByError = () => {
        const groupedByError = [];
        for (const line of lines) {
            const error = line.slice(-1)[0];
            const errorExist = groupedByError.filter((el: any) => el.error === error);
            if (errorExist.length) {
                errorExist[0].nbLines += 1;
            }
            else {
                groupedByError.push({ error: error, nbLines: 1 });
            }
        }
        return groupedByError;
    };

    const linesGrouped = groupLinesByError();

    //Render
    return (
        <Box>
            <Box sx={styles.listErrors} p={2}>
                <ul>
                    {linesGrouped.map((field: any, index: number) =>
                        <li key={index}>
                            {field.nbLines} lignes rejetées ==&gt; {field.error.replace("n'est pas dans la liste que je traite |", '')}
                            {field.error.match('(Large OTC trading|Buy Crypto|Margin loan|Margin Repayment)') !== null &&
                                <Box display="inline" sx={{ color: 'error.main', backgroundColor: '#160B0B' }}>
                                    ==&gt; Il faut créer les fichiers manuels de gestion de ces rejets !
                                </Box>}
                        </li>
                    )}
                </ul>
                <Button onClick={()=>showRows((prev:any) => !prev)} variant="contained">Afficher les lignes</Button>
            </Box>

            {showedRows &&
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
            }
        </Box>

    );
};

export default FileLoadedLines;