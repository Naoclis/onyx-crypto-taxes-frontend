/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const ExportLawyer = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [inProgress, setInProgress] = useState<number>(-1);

    //Functions
    const init = async () => {
        setInProgress(1);
        //let res = await apiCaller.get('get/assetsEvolution/byYear', 'taxesCalculator');
        //if (res !== undefined) {
        //    setYearWalletViews(res.views);
        //}
        setInProgress(-1);
    };

    //Effects
    //useEffect(() => {
    //    init();
    //}, []);

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
                        J'ai rien fait pour le moment
                    </Box>
                }
            </Grid>
        </Grid>
    );
};

export default ExportLawyer;