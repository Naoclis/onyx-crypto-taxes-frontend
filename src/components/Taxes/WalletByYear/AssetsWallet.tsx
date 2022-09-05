/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const AssetsWallet = (props: any) => {
    const { year, ethMined, totalMinedEth, view, testingView } = props;
    //Variables

    //States
    //Functions
    const testValue = (item:any) => {
        const hasValue = testingView.filter((el: any) => el.asset.toUpperCase() === item.asset.toUpperCase());
        const qty = (hasValue.length > 0) ? hasValue[0].qty : 0;
        const diff = (qty - item.qty);
        const isOK = (Math.abs(diff) < 0.00001) ? 'OK' : 'KO';
        
        return (isOK === 'OK') ?
            <Box sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                {item.qty.toFixed(5)} - {isOK}<br />
                {qty.toFixed(5)}
            </Box>
            :
            <Box sx={{ color: 'primary.main', fontWeight: 'bold', backgroundColor: 'white' }}>
                {item.qty.toFixed(5)} - {isOK}<br />
                {item.qty.toFixed(5)} VS {qty.toFixed(5)}
                <br />
                {diff.toFixed(5)}
            </Box>
    };

    //Effects
    //Render
    return (
        <Box>
            <h1>Etat du portefeuille au 01/01/{year}</h1>
            <h4>ETH produit sur l'année précédente : {ethMined}</h4>
            <h4>Cumul ETH produits : {totalMinedEth}</h4>
            {["2019", "2020", "2021", "2022"].includes(year) && <h5>J'ai 0.006027 de frais ETH qui explique pourquoi la différence en rouge est légèrement inférieure à l'ETH miné : {totalMinedEth} - 0.006027 = {totalMinedEth - 0.006027}</h5>}
            <Table sx={defaultStyles.table}>
                <TableHead>
                    <TableRow>
                        {view.map((item: any, index: number) =>
                            <TableCell key={index}>{item.asset}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {view.map((item: any, index: number) =>
                            <TableCell key={index}>{testValue(item)}</TableCell>
                        )}
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};

const AssetsView = (props: any) => {
    const { views } = props;
    //Variables

    //States
    //Functions


    //Effects
    //Render
    return (
        <Box>
            {views.map((item: any, index: number) =>
                <AssetsWallet key={index} view={item.view} year={item.year} ethMined={item.ethMined} totalMinedEth={item.totalMinedEth} testingView={item.testingView}/>
            )}
        </Box>
    );
};

export default AssetsView;