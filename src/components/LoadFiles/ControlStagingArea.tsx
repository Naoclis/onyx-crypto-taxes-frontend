/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import StagingTablesChecker from './CompleteDatabase/StagingTableChecker';
//Api
import ApiOperations from '../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const ControlStagingArea = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [inProgress, setInProgress] = useState<number>(-1);
    const [tablesKpi, setTablesKpi] = useState<any>(
        {
            "future": { "rejected": 0, "accepted": 0 },
            "spot": { "rejected": 0, "accepted": 0 },
            "staking": { "rejected": 0, "accepted": 0 },
            "coldWallet": { "rejected": 0, "accepted": 0 }
        }
    );
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('validate/stagingArea', 'databaseValidator');
        if (res !== undefined) {
            setTablesKpi(res.results);
            setInProgress(-1);
        }
    };

    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {tablesKpi !== undefined &&
                    <StagingTablesChecker tablesKpi={tablesKpi} />
                }
            </Grid>
        </Grid>
    );
};

export default ControlStagingArea;