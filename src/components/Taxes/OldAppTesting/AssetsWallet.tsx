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
    const isItemOKWithTesting = (item: any) => {
        const hasValue = testingView.filter((el: any) => el.asset.toUpperCase() === item.asset.toUpperCase());
        const qty = (hasValue.length > 0) ? hasValue[0].qty : 0;
        const diff = (qty - item.qty);
        const isOK = (Math.abs(diff) < 0.00001) ? 'OK' : 'KO';
        return isOK;
    };

    const testValue = (item: any) => {
        const isOK = isItemOKWithTesting(item);
        const hasValue = testingView.filter((el: any) => el.asset.toUpperCase() === item.asset.toUpperCase());
        const qty = (hasValue.length > 0) ? hasValue[0].qty : 0;
        const diff = (qty - item.qty);
        return (isOK === 'OK') ?
            <Box sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                {item.qty.toFixed(5)}<br />
                {qty.toFixed(5)}
            </Box>
            :
            <Box sx={{ color: 'primary.main', fontWeight: 'bold', backgroundColor: 'white' }}>
                {item.qty.toFixed(5)}<br />
                {item.qty.toFixed(5)} VS {qty.toFixed(5)}
                <br />
                {diff.toFixed(5)}
            </Box>
    };

    //Effects
    //Render
    return (
        <Box>
            <h4>Etat du portefeuille au 01/01/{year}</h4>
            <h5>ETH produit sur l'année précédente : {ethMined} - Cumul ETH produits : {totalMinedEth}</h5>
            {["2019", "2020", "2021", "2022"].includes(year) && <h5>J'ai 0.006027 de frais ETH qui explique pourquoi la différence en rouge est légèrement inférieure à l'ETH miné : {totalMinedEth} - 0.006027 = {totalMinedEth - 0.006027}</h5>}
            <Table sx={defaultStyles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Asset</TableCell>
                        <TableCell>Qté</TableCell>
                        <TableCell>Statut</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {view.map((item: any, index: number) => {
                        if (parseFloat(item.qty) !== 0) {
                            return (<TableRow key={index}>
                                <TableCell>{item.asset}</TableCell>
                                <TableCell>{testValue(item)}</TableCell>
                                <TableCell>{isItemOKWithTesting(item)}</TableCell>
                            </TableRow>)
                        }
                        else {
                            return (<React.Fragment key={index}/>);
                        }
                            
                        }
                    )}
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
            <h2>Comparaison des portefeuilles entre le modèle "assetsEvolution" et l'ancienne base de donnée</h2>
            <h4>En théorie, il faut retrouver les mêmes quantités jusqu'en 2021, au détail du mining près</h4>
            Pour aider à la vérification, il faut sélectionner un asset et une année.<br />
            L'application vérifie pour chaque asset, la quantité obtenue en fin d'année, en faisant la somme des ajouts/retraits de l'année considérée.<br />
            Puis elle termine en comparant si cette quantité est égale à la quantité obtenue dans la table de comparaison.
            <br />
            Si c'est "KO", il faut trouver la cause de la différence et corriger
            <br />
            {views.map((item: any, index: number) =>
                <AssetsWallet key={index} view={item.view} year={item.year} ethMined={item.ethMined} totalMinedEth={item.totalMinedEth} testingView={item.testingView} />
            )}
        </Box>
    );
};

export default AssetsView;
