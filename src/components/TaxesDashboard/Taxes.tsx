/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components

import Loader from '../../components/UIElements/Loader';
import TaxesByYear from './Taxes/TaxesByYear';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const Taxes = () => {

    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [inProgress, setInProgress] = useState<number>(-1);
    const [taxes, setTaxes] = useState([]);
    const [testingTaxes, setTestingTaxes] = useState([]);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/walletValor/taxes', 'taxesCalculator');
        if (res !== undefined) {
            const { taxes, testingTaxes } = res;
            setTaxes(taxes);
            setTestingTaxes(testingTaxes);
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
                <h4>Vision détaillée des impôts par année</h4>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <TaxesByYear taxes={taxes} testingTaxes={testingTaxes} />
                }
                
            </Grid>
        </Grid>
    );
};

export default Taxes;