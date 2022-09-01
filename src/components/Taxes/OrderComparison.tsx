/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import MyComboBox from '../../components/UIElements/MyComboBox';
import OCAnalysisRows from './OrderComparison/OCAnalysisRows';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/

const TimestampResults = (props: any) => {
    const { tableName, type, results } = props;

    return (
        <Box>
            {(results.length > 0) ?
                <React.Fragment>
                    <h3>{`${type} (${tableName})`}</h3>
                    <OCAnalysisRows title={`${type} (${tableName})`} rows={results} />
                </React.Fragment>
                :
                <h3>{`Test ${type} OK pour ${tableName}`}</h3>
            }

        </Box>
    )
};

const TestResults = (props: any) => {
    const { tableName, results } = props;
    const { rows, missing, different } = results;
    return (
        <Box>
            <h1>Résultats du test</h1>
            {/*<ul>*/}
            {/*    <li>Lignes manquantes dans {tableName} : {results.missing.length}</li>*/}
            {/*    <li>Lignes différentes dans {tableName} : {results.different.length}</li>*/}
            {/*</ul>*/}
            {/*<Rows title={`Lignes manquantes (${tableName})`} rows={results.missing} />*/}
            {/*<Rows title={`Lignes différentes (${tableName})`} rows={results.different} />*/}
            <TimestampResults type="Lignes manquantes" results={missing} tableName={tableName} />
            <TimestampResults type="Lignes différentes" results={different} tableName={tableName} />
        </Box>
    )
};




const OrderComparison = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States    
    const [assetsList, setAssetsList] = useState([]);
    const [yearsList, setYearsList] = useState([]);
    const [testParams, setTestParams] = useState({
        asset: 'BNB', year: '2021'
    });
    const [testResults, setTestResults] = useState({
        origin: {
            rows: [],
            missing: [],
            different: []
        },
        test: {
            rows: [],
            missing: [],
            different: []
        }
    });
    const [inProgress, setInProgress] = useState<number>(-1);

    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/assetsEvolution/filters', 'taxesCalculator');
        if (res !== undefined) {
            const aList = res.assets.sort().map((item: any) => ({ _id: item, label: item }));
            const yList = res.years.sort().map((item: any) => ({ _id: item, label: item }));
            setAssetsList(aList);
            setYearsList(yList);
            setInProgress(-1);
        }
    };

    const selectAsset = (value: any, type: string) => {
        if (value !== '-1') {
            const item: any = { ...testParams };
            item[type] = value;
            setTestParams(item);
        }
    };

    const launchTest = async () => {
        setInProgress(1);
        const res = await apiCaller.post('/check/assetsEvolution', testParams, 'taxesCalculator');
        if (res !== undefined) {
            const { origin, test, testAnalysis, sourceAnalysis } = res;
            setTestResults({
                test: {
                    rows: test,
                    missing: testAnalysis.missing,
                    different: testAnalysis.different
                },
                origin: {
                    rows: origin,
                    missing: sourceAnalysis.missing,
                    different: sourceAnalysis.different
                }
            });
            setInProgress(-1);
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
                {inProgress === 1 &&
                    <Box mb={2}>
                        <Loader message="Action en cours" />
                    </Box>
                }
                {inProgress !== 1 &&
                    <Box>
                        <MyComboBox items={assetsList} label="Choix de l'asset" id="selectAsset" onChange={(e: any) => selectAsset(e, "asset")} init={testParams.asset} />
                        <MyComboBox items={yearsList} label="Choix de l'année" id="selectYear" onChange={(e: any) => selectAsset(e, "year")} init={testParams.year} />
                        <Button variant="contained" onClick={launchTest}>Lancer Test</Button>
                    <Box>
                        les lignes "manquantes" sont les lignes présentes dans une table et pas dans l'autre, pour un timestamp donné.<br/>
                        Les lignes "en écart" sont des lignes pour lesquelles, pour un même timestamp, on ne trouve pas la même quantité dans assetsEvolution et wholeOrders.
                    </Box>
                        <TestResults tableName="assetsEvolution" results={testResults.test} />
                        <TestResults tableName="wholeOrders" results={testResults.origin} />
                    </Box>
                }
            </Grid>
        </Grid>
    );
};

export default OrderComparison;