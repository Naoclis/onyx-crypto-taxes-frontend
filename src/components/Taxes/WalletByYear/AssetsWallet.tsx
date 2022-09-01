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

    const [checked, setChecked] = React.useState(false);

    //Functions
    const updateAssetTestingLog = (event: React.ChangeEvent<HTMLInputElement>, asset: string) => {
        setChecked(event.target.checked);
    };

    //Render
    return (
        <TableRow>
            <TableCell>{item.exchange}</TableCell>
            <TableCell>{item.asset}</TableCell>
            <TableCell>{item.qty}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell><Switch checked={checked} onChange={(e) => updateAssetTestingLog(e, item.asset)} /></TableCell>
        </TableRow>
    );
}

const AssetsWallet = (props: any) => {
    const { year, ethMined, view, testingView } = props;
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

            <Box>
                Recette Comparative :
                <ul>
                    <li>2018 : OK</li>
                    <li>2019 : OK, petit diff dans ETH (64,21210869 attendu, j'en trouve  (diff de 0,006)</li>
                    <li>2020 : OK, petit diff dans ETH (même différence que l'année précédente, ce qui est logique et rassurant )</li>
                    <li>2021 : KO
                        <br />
                        BTC : attendu 0,6957505
                        <br />
                        ETH : attendu 97,97366402; je suis à 
                        <br />
                        USDT : attendu 6403,008398
                    </li>
                </ul>
            </Box>
            {views.map((item: any, index: number) =>
                <AssetsWallet key={index} view={item.view} year={item.year} ethMined={item.ethMined} testingView={item.testingView}/>
            )}
        </Box>
    );
};

export default AssetsView;