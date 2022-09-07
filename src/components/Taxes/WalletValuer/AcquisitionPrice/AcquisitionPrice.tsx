/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles, palette } from '../../../../assets/styles/theme';

const styles = {
    details: {
        'tr td': {
            backgroundColor: palette.background.black,
            color: 'white',
        },
        'tr th': {
            backgroundColor: palette.purple[500],
            fontWeight: 'bold'
        },
        'td, th': {
            border: 1,
            padding: '2px',
            textAlign: 'center',
        },
    }
};
/*********** [ COMPONENT ] ****************/
const AcquisitionPriceAssetDetails = (props: any) => {
    const { details } = props;

    //Render
    return (
        <Table sx={styles.details}>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Qté (ajout/retrait)</TableCell>
                    <TableCell>Qté (total)</TableCell>
                    <TableCell>Prix moyen</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {details.map((item: any, index: number) =>
                    <TableRow key={index}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.orderQty.toFixed(2)}</TableCell>
                        <TableCell>{item.newQtyTotal.toFixed(2)}</TableCell>
                        <TableCell>{item.acquisitionPrice.toFixed(2)}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};


const AcquisitionPriceAssets = (props: any) => {
    const { assets } = props;

    //Variables
    //States
    //Functions


    //Effects
    //Render
    return (
        <Table sx={defaultStyles.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Qté</TableCell>
                    <TableCell>Prix moyen annuel</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {assets.map((item: any, index: number) =>
                    <React.Fragment key={index}>
                        <TableRow>
                            <TableCell>{item.asset}</TableCell>
                            <TableCell>{item.qty.toFixed(2)}</TableCell>
                            <TableCell>{item.price.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>
                                <AcquisitionPriceAssetDetails details={item.details} />                                
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} sx={{ '&.MuiTableCell-root': {backgroundColor:'black'}}}>&nbsp;</TableCell>
                        </TableRow>
                    </React.Fragment>
                )}
            </TableBody>
        </Table>
    );
};

const AcquisitionPrice = (props: any) => {
    const { ldyStates } = props;
    //Variables

    //States
    //Functions


    //Effects
    //Render
    return (
        <Box>
            <h4>Prix Acquisition sur l'année : {ldyStates.acquisitionPrice.toFixed(2)}</h4>
            <AcquisitionPriceAssets assets={ldyStates.assets} />
        </Box>
    );
};

export default AcquisitionPrice;