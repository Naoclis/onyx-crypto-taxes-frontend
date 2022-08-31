/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import MyComboBox from '../../components/UIElements/MyComboBox';
import AssetsWallet from './InitWallet/AssetsWallet';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const WalletByYear = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States
    const [uniqueWallet, setUniqueWallet] = useState<any>([]);
    const [filteredWallet, setFilteredWallet] = useState([]);
    const [inProgress, setInProgress] = useState<number>(-1);
    const [assetsStatus, setAssetsStatus] = useState([]);
    const [assetsList, setAssetsList] = useState([]);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/assetsEvolution/byYear', 'taxesCalculator');
        if (res !== undefined) {
            setFilteredWallet(res.wallet);
            setInProgress(-1);
        }
    };


    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <AssetsWallet wallet={filteredWallet} updateLog={()=>(null)} />
            </Grid>
        </Grid>
    );
};

export default WalletByYear;