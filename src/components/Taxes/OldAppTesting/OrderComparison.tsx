/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../../components/UIElements/Loader';
import MyComboBox from '../../../components/UIElements/MyComboBox';
import OCAnalysisRows from './OCAnalysisRows';
//Api
import ApiOperations from '../../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

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
    const { missing, different } = results;
    return (
        <Box>
            <h1>Résultats du test</h1>
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
        <Box>
            <h2>Comparaison des lignes entre le modèle "assetsEvolution" et l'ancienne base de donnée</h2>
            <h4>En théorie, il faut retrouver les mêmes lignes jusqu'en 2021, au détail du mining près</h4>
            Pour aider à la vérification, il faut sélectionner un asset et une année.<br />
            L'application va alors retourner les lignes "non identiques" qu'elle trouve dans assetsEvolution et pas dans la table 'wholeOrders' (qui contient ma version Excel des données) et vice-versa.<br />
            Normalement, je dois retrouver les mêmes lignes. S'il y a des différences, elles doivent être dûes soit au minage, soit à une aggrégation non faite dans la table d'origine. <br /> Si ce n'est pas le cas, alors j'ai un "trou" à expliquer pour comprendre pourquoi la nouvelle version a des lignes soit en plus, soit en moins, soit avec des valeurs différentes.
            <br />


            {inProgress === 1 &&
                <Box mb={2}>
                    <Loader message="Action en cours" />
                </Box>
            }
            {inProgress !== 1 &&
                <Box mt={2}>

                    <Box display="flex" alignItems="center">
                        <MyComboBox items={assetsList} label="Choix de l'asset" id="selectAsset" onChange={(e: any) => selectAsset(e, "asset")} init={testParams.asset} />
                        <MyComboBox items={yearsList} label="Choix de l'année" id="selectYear" onChange={(e: any) => selectAsset(e, "year")} init={testParams.year} />
                        <Button variant="contained" onClick={launchTest}>Lancer Test</Button>
                    </Box>
                <Box>
                    <ul>
                        <li>Les lignes "manquantes" sont les lignes présentes dans une table et pas dans l'autre, pour un timestamp donné.</li>
                        <li>Les lignes "en écart" sont des lignes pour lesquelles, pour un même timestamp, on ne trouve pas la même quantité dans assetsEvolution et wholeOrders.</li>
                        </ul>                        
                    </Box>
                    <TestResults tableName="assetsEvolution" results={testResults.test} />
                    <TestResults tableName="wholeOrders" results={testResults.origin} />
                </Box>
            }
        </Box>
    );
};

export default OrderComparison;