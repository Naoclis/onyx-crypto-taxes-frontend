/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../../assets/styles/theme';
const styles = {
    error: {
        '&.MuiTableCell-root' :{
            color: 'secondary.main', fontWeight: 'bold'
        }
    },
    ok: {
        '&.MuiTableCell-root': {
            color: 'primary.main', fontWeight: 'bold', backgroundColor: 'white'
        }
    },
};
/*********** [ COMPONENT ] ****************/
const TaxesCell = (props: any) => {
    const { item, testing, property } = props;

    const diff = Math.abs(parseFloat(item[property]) - parseFloat(testing[property]));
    //Functions

    return (
        <TableCell sx={(diff < 7) ? styles.error : styles.ok}>{item[property].toFixed()} - ({diff.toFixed()})</TableCell>
    );
};



const TaxesRow = (props: any) => {
    const { taxes, testingTaxes } = props;
    //Variables
    const rows = (taxes.length > 0) ? taxes[0].taxes : [];
    const totalPnL = (rows.length > 0) ? rows.reduce((p: number, c: any) => (p + c.profitAndLoss), 0) : 0;
    
    const findRowInTesting = (item:any) => {
        const exist = testingTaxes.filter((el: any) => el.day === item.day && el.hour === item.hour);
        const row = (exist.length > 0) ? exist[0] : [];
        if (row.length < 1) console.log(item);
        return row;
    }

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
                        {['walletValue', 'amount', 'fee', 'amountWithoutFee'].map((keyValue: any, _index: number) => (
                            <TaxesCell key={`${keyValue}`} item={item} testing={findRowInTesting(item)} property={keyValue} />
                            )
                        )}
                        <TableCell>0</TableCell>
                        {['amountWithoutSoulte', 'netAmount'].map((keyValue: any, _index: number) => (
                            <TaxesCell key={`${keyValue}`} item={item} testing={findRowInTesting(item)} property={keyValue} />
                        )
                        )}
                        <TableCell>{item.acquisitionPrice.toFixed()}</TableCell>
                        <TableCell>{item.capitalFraction.toFixed()}</TableCell>
                        <TableCell>{item.netAcquisitionPrice.toFixed()}</TableCell>
                        {['profitAndLoss'].map((keyValue: any, _index: number) => (
                            <TaxesCell key={`${keyValue}`} item={item} testing={findRowInTesting(item)} property={keyValue} />
                        )
                        )}
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