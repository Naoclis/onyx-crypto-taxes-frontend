/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../../components/UIElements/Loader';
import MyComboBox from '../../../components/UIElements/MyComboBox';
//Api
import ApiOperations from '../../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const AssetEvolutionRow = (props: any) => {
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

const AssetEvolution = () => {
    //Variables
    const apiCaller = new ApiOperations();

    //States
    const [uniqueWallet, setUniqueWallet] = useState<any>([]);
    const [filteredWallet, setFilteredWallet] = useState([]);
    const [assetsList, setAssetsList] = useState([]);
    const [asset, setAsset] = useState('BNB');
    const [inProgress, setInProgress] = useState<number>(-1);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/assetsEvolution/all', 'taxesCalculator');
        if (res !== undefined) {
            const assetsList = res.assets.sort().map((item: any) => ({ _id: item, label: item }));
            setAssetsList(assetsList);
            setUniqueWallet(res.wallet);
            setFilteredWallet(res.wallet.filter((el: any) => el.asset === asset));
            setInProgress(-1);
        }
    };

    const selectAsset = (value: any) => {
        if (value !== '-1') {
            const wallet = uniqueWallet.filter((el: any) => el.asset === value);
            setAsset(value);
            setFilteredWallet(wallet);
        }
        else {
            setFilteredWallet(uniqueWallet);
        }
    }

    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <h2>Visualisation de toutes les lignes du mod??le 'assetsEvolution' pour un asset donn??</h2>
                Pour aider ?? la v??rification et ?? la comparaison ligne ?? ligne entre l'ancien et le nouveau mod??le<br />
                <br />
                <Box mb={2}>
                    <MyComboBox items={assetsList} label="Choix de l'asset" id="selectAsset" onChange={selectAsset} init={asset} />
                </Box>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <Table sx={defaultStyles.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Plateforme</TableCell>
                                <TableCell>Asset</TableCell>
                                <TableCell>Quantit??</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredWallet.map((item: any, index: number) =>
                                <AssetEvolutionRow key={index} item={item}/>
                            )}
                        </TableBody>
                    </Table>
                }
            </Grid>
        </Grid>
    );
};

export default AssetEvolution;