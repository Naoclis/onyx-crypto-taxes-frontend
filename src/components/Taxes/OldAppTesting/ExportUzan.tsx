/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../../components/UIElements/Loader';
//Api
import ApiOperations from '../../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles, palette } from '../../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const AggRow = (props: any) => {
    const { item, testing, source, _key } = props;
    const [compar, setCompar] = useState<any>({ sameKey: [], oppositeKey: [], sourceOpposite:[] });

    const init = () => {
        const opposite = (_key === 'outputs') ? 'inputs' : 'outputs';
        const sameKey = testing[_key].filter((el: any) => el.asset === item.asset);
        const oppositeKey = testing[opposite].filter((el: any) => el.asset === item.asset);
        const sourceOpposite = source[opposite].filter((el: any) => el.asset === item.asset);

        const compar = {
            sameKey: sameKey,
            oppositeKey: oppositeKey,
            sourceOpposite: sourceOpposite
        };
        setCompar(compar);
    };

    //const findTestingAggRow = () => {
    //    const hasTestingRow = arr.filter((el: any) => el.asset === item.asset);
    //    if (hasTestingRow.length === 1) {
    //        const diff = item.qty - hasTestingRow[0].qty;
    //        const test = (Math.abs(diff) < 0.0001);

    //        return hasTestingRow[0];
    //    }
    //    else {
    //        return null;
    //    }
    //};

    //const compareWithTest = () => {
    //    if (compar !== null) {
    //        const diff = item.qty - compar.qty;
    //        const test = (Math.abs(diff) < 0.0001);
    //        return { test: test, diff: diff };
    //    }
    //    return { test: false, diff: 0 };
    //}

    const checkTest = () => {
        let message = '';
        let status = 0;
        let diff = {source:0, sameTest:0}
        if (compar.oppositeKey.length > 0) {
            message += 'Dans la clé opposée Test';
            status += 1;
        }
        if (compar.sameKey.length > 0) {
            status += 10;
            diff.sameTest = compar.sameKey[0].qty - item.qty;

            message += ` | Dans la même clé Test: diff = ${diff.sameTest.toFixed(3)}`;
        }
        if (compar.sourceOpposite.length > 0) {
            status += 100;
            diff.source = compar.sourceOpposite[0].qty - item.qty;

            message += ` | Dans la clé opposée Source`;
        }


        //if (compar !== null) {
        //    const { test, diff } = compareWithTest();
        //    res = (! test) ?
        //        (<TableRow className="odd">
        //            <TableCell>{compar.asset}</TableCell>
        //            <TableCell>Testing : {compar.qty} || Manque : {diff}</TableCell>
        //            <TableCell>{compar.date.length}</TableCell>
        //        </TableRow>)
        //        :
        //        (
        //            <TableRow className="even">
        //                <TableCell colSpan={8}>c'est OK !</TableCell>
        //            </TableRow>
        //        );
        //}
            let res: any = (
                <TableRow className="even">
                    <TableCell colSpan={8}>{message}</TableCell>
                </TableRow>
            );

        return res;
    }

    //Effect
    useEffect(() => {
        init();
    }, [])

    //Render
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>{item.asset}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{compar.sourceOpposite.length > 0 && Math.abs(item.qty - compar.sourceOpposite[0].qty).toFixed(2)}</TableCell>
                <TableCell>{compar.sameKey.length > 0 && compar.sameKey[0].qty.toFixed(2)}</TableCell>
                <TableCell>{item.date.length}</TableCell>
            </TableRow>

            {checkTest()}
        </React.Fragment>
    );
};

const AggBox = (props: any) => {
    const { source, _key, testing } = props;

    const hasTestingAggRow = (arr: any, item: any) => {
        let test = false;
        const hasTestingRow = arr.filter((el: any) => el.asset.toLowerCase() === item.asset.toLowerCase());
        if (hasTestingRow.length === 1) {
            const diff = item.qty - hasTestingRow[0].qty;
            test = (Math.abs(diff) < 0.0001);
            if (!test) {
                //Je vérifie si la diff n'est pas de l'autre côté
                test = checkOppositeSide(item);
            }
        }
        else {
            //Je vérifie si la diff n'est pas de l'autre côté
            test = checkOppositeSide(item);
        }
        return test;
    };

    const checkOppositeSide = (item:any) => {
        const opposite = (_key === 'outputs') ? 'inputs' : 'outputs';
        const testSrc = testing[_key].filter((el: any) => el.asset.toLowerCase() === item.asset.toLowerCase());
        const testOpp = testing[opposite].filter((el: any) => el.asset.toLowerCase() === item.asset.toLowerCase());
        const sourceOpp = source[opposite].filter((el: any) => el.asset.toLowerCase() === item.asset.toLowerCase());
        const testOppQty = (testOpp.length > 0) ? testOpp[0].qty : 0;
        const testSrcQty = (testSrc.length > 0) ? testSrc[0].qty : 0;
        const sourceOppQty = (sourceOpp.length > 0) ? sourceOpp[0].qty : 0;
        const newDiff = Math.abs(item.qty - sourceOppQty) - Math.abs(testOppQty - testSrcQty);
        //console.log(`Asset : ${item.asset} => ${item.qty}  | keyOpp: ${opposite} - test : ${testOppQty} | ${sourceOppQty} => ${Math.abs(item.qty - sourceOppQty)}`);
        
        const test = (Math.abs(newDiff) < 0.0001);
        return test;
    };

    //Render
    return (
        <Box>
            <h2>{_key}</h2>
            <Table sx={defaultStyles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Asset</TableCell>
                        <TableCell>Qté</TableCell>
                        <TableCell>Qté totale (input+output)</TableCell>
                        <TableCell>Cible à trouver</TableCell>
                        <TableCell>Nb Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {source !== undefined && source[_key].filter((el: any) => ['TWT', 'GAS', 'BNB'].includes(el.asset) === false).map((item: any, index: number) => (
                        <React.Fragment key={index}>
                            {!hasTestingAggRow(testing[_key], item) && <AggRow item={item} _key={_key} testing={testing} source={source}/>}
                        </React.Fragment>
                    )

                    )}
                </TableBody>
            </Table>
        </Box>
    )
};

const ExportUzan = () => {
    //Variables
    const apiCaller = new ApiOperations();

    //States
    const [aggExported, setAggExported] = useState({ fees: [], outputs: [], inputs: [] });
    const [aggTesting, setAggTesting] = useState({ fees: [], outputs: [], inputs: [] });
    const [inProgress, setInProgress] = useState<number>(-1);
    const [year, setYear] = useState<string>('2021');
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/assetsEvolution/forLawyer', 'taxesCalculator');
        if (res !== undefined) {
            const { aggExports, testAggExports } = res;
            setAggExported(aggExports);
            setAggTesting(testAggExports);
        }
        setInProgress(-1);
    };

    const createExports = async () => {
        setInProgress(1);
        const res = await apiCaller.get(`generate/assetsEvolution/forLawyer/${year}`, 'taxesCalculator');
        if (res !== undefined) {
            await init();
        }
        setInProgress(-1);
    };

    //Pour fixer l'année de calcul
    const updateYear = (event: any) => {
        const value = event.target.value;
        setYear(value);
    }

    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Box>
            <h2>Comparaison des exports pour Uzan</h2>
            <h4>En théorie, il faut retrouver les mêmes quantités jusqu'en 2021, au détail du mining près</h4>
            Pour aider à la vérification, il faut sélectionner un asset et une année.<br />
            <Box mt={4} mb={2} display="flex" alignItems="center">
                <Box mr={2}>Précisez l'année sur laquelle lancer les calculs :</Box>
                <TextField label="Année de calcul" variant="outlined" value={year} onChange={updateYear} />
                <Box ml={2}>
                    <Button variant="contained" onClick={createExports}>Générer Exports</Button>
                </Box>
            </Box>
            
            
            {inProgress === 1 &&
                <Box mb={2}>
                    <Loader message="Action en cours" />
                </Box>
            }
            {inProgress !== 1 &&
                <Box>
                    <AggBox source={aggExported} _key='fees' testing={aggTesting} />
                    <AggBox source={aggExported} _key='outputs' testing={aggTesting} />
                    <AggBox source={aggExported} _key='inputs' testing={aggTesting} />
                </Box>
            }

        </Box>
    );
};

export default ExportUzan;
