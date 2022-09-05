/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import AssetsView from './WalletByYear/AssetsWallet';
import Debug from './WalletByYear/Debug';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const WalletByYear = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [yearWalletViews, setYearWalletViews] = useState([]);
    const [inProgress, setInProgress] = useState<number>(-1);
    const [debug, setDebug] = useState([]);
    //Functions
    const init = async () => {
        setInProgress(1);
        let res = await apiCaller.get('get/assetsEvolution/byYear', 'taxesCalculator');
        if (res !== undefined) {
            setYearWalletViews(res.views);
            
        }
        res = await apiCaller.get('generate/assetsEvolution/debug', 'taxesCalculator');
        if (res !== undefined) {
            const { ethermine, cruxpool } = res;

            setDebug(ethermine.concat(cruxpool));
        }
        setInProgress(-1);
    };

    const updateFDYStates = async () => {
        setInProgress(1);
        const res = await apiCaller.get('generate/assetsEvolution/byYear', 'taxesCalculator');
        if (res !== undefined) {
            await init();
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
                <Button variant="contained" onClick={updateFDYStates}>Rafraîchir Etats Portefeuille au 01 janvier</Button>
                

                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <Debug rows={debug} />
                }
                {inProgress !== 1 &&
                    <AssetsView views={yearWalletViews}/>
                }                
            </Grid>
        </Grid>
    );
};

export default WalletByYear;