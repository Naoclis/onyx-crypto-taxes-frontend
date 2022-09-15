/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import AssetsWalletView from './OldAppTesting/AssetsWallet';
import AssetEvolution from './OldAppTesting/AssetEvolution';
import OrderComparison from './OldAppTesting/OrderComparison';
import ExtractData from './OldAppTesting/ExtractData';
import ExportUzan from './OldAppTesting/ExportUzan';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const OldAppTesting = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [yearWalletViews, setYearWalletViews] = useState([]);
    const [inProgress, setInProgress] = useState<number>(-1);
    const [tab, setTab] = useState('walletComparison');
    //Functions
    const init = async () => {
        setInProgress(1);
        let res = await apiCaller.get('get/assetsEvolution/byYear', 'taxesCalculator');
        if (res !== undefined) {
            setYearWalletViews(res.views);
        }
        setInProgress(-1);
    };

    const chooseTab = (tabName: string) => {
        setTab(tabName);
    };

    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <Box>
                        <Box mb={2} sx={{ '& > .MuiButtonBase-root': { margin: '0 0.5em' } }}>
                            <Button variant="contained" onClick={() => chooseTab('assetEvolution')}>Vision Evolution d'un Asset</Button>
                            <Button variant="contained" onClick={() => chooseTab('walletComparison')}>Comparaison des portefeuilles au 01/01</Button>
                            <Button variant="contained" onClick={() => chooseTab('walletRowsComparison')}>Comparaison des lignes entre portefeuilles</Button>
                            <Button variant="contained" onClick={() => chooseTab('debugger')}>Extraction de données</Button>
                            <Button variant="contained" onClick={() => chooseTab('exportUzan')}>Export Uzan</Button>
                        </Box>
                        {tab === 'assetEvolution' && <AssetEvolution />}
                        {tab === 'walletComparison' && <AssetsWalletView views={yearWalletViews} />}
                        {tab === 'walletRowsComparison' && <OrderComparison />}
                        {tab === 'debugger' && <ExtractData />}
                    {tab === 'exportUzan' && <ExportUzan />}

                    </Box>
                }
            </Grid>
        </Grid>
    );
};

export default OldAppTesting;