/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../../components/UIElements/Loader';
//Api
import ApiOperations from '../../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles, palette } from '../../../assets/styles/theme';

const styles = {
    odd: {
        'td': {
            backgroundColor: palette.secondary.dark
        },
    }
};
/*********** [ COMPONENT ] ****************/
const AggRow = (props: any) => {
    const { item, testing, compar } = props;

    const compareWithTest = () => {
        if (compar !== null) {
            const diff = item.qty - compar.qty;
            const test = (Math.abs(diff) < 0.0001);
            return { test: test, diff: diff };
        }
        return { test: false, diff: 0 };
    }

    const checkTest = () => {
        let res: any = (
            <TableRow className="even">
                <TableCell colSpan={8}>-</TableCell>
            </TableRow>
        );
        if (compar !== null) {
            const { test, diff } = compareWithTest();
            res = (! test) ?
                (<TableRow className="odd">
                    <TableCell>{compar.asset}</TableCell>
                    <TableCell>Testing : {compar.qty} || Manque : {diff}</TableCell>
                    <TableCell>{compar.date.length}</TableCell>
                </TableRow>)
                :
                (
                    <TableRow className="even">
                        <TableCell colSpan={8}>c'est OK !</TableCell>
                    </TableRow>
                );
        }
        return res;
    }

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>{item.asset}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{item.date.length}</TableCell>
            </TableRow>

            {checkTest()}
        </React.Fragment>
    );
};

const AggBox = (props: any) => {
    const { source, _key, testing } = props;

    const findTestingAggRow = (arr: any, item: any) => {
        const hasTestingRow = arr.filter((el: any) => el.asset === item.asset);
        if (hasTestingRow.length === 1) {
            const diff = item.qty - hasTestingRow[0].qty;
            const test = (Math.abs(diff) < 0.0001);

            return hasTestingRow[0];
        }
        else {
            return null;
        }
    };

    const hasTestingAggRow = (arr: any, item: any) => {
        let test = false;
        const hasTestingRow = arr.filter((el: any) => el.asset === item.asset);
        if (hasTestingRow.length === 1) {
            const diff = item.qty - hasTestingRow[0].qty;
            test = (Math.abs(diff) < 0.0001);
            if (!test) {
                //Je vérifie si la diff n'est pas de l'autre côté
                test = checkOppositeSide(item);
                if (item.asset === 'FIL') {
                    console.log(item);
                    console.log(hasTestingRow[0]);
                    console.log(test);
                }
                    
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
        const testSrc = testing[_key].filter((el: any) => el.asset === item.asset);
        const testOpp = testing[opposite].filter((el: any) => el.asset === item.asset);
        const sourceOpp = source[opposite].filter((el: any) => el.asset === item.asset);
        const testOppQty = (testOpp.length > 0) ? testOpp[0].qty : 0;
        const testSrcQty = (testSrc.length > 0) ? testSrc[0].qty : 0;
        const sourceOppQty = (sourceOpp.length > 0) ? sourceOpp[0].qty : 0;
        const newDiff = Math.abs(item.qty - sourceOppQty) - Math.abs(testOppQty - testSrcQty);
        console.log(`Asset : ${item.asset} => ${item.qty}  | keyOpp: ${opposite} - test : ${testOppQty} | ${sourceOppQty} => ${Math.abs(item.qty - sourceOppQty)}`);
        
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
                        <TableCell>Qté totale</TableCell>
                        <TableCell>Nb Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {source !== undefined && source[_key].map((item: any, index: number) => (
                        <React.Fragment key={index}>
                            {!hasTestingAggRow(testing[_key], item) && <AggRow item={item} compar={findTestingAggRow(testing[_key], item)} testing={testing}/>}
                        </React.Fragment>
                    )

                    )}
                </TableBody>
            </Table>
        </Box>
    )
};


const Row = (props: any) => {
    const { item } = props;

    return (
        <React.Fragment>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.exchange}</TableCell>
            <TableCell>{item.outputAsset}</TableCell>
            <TableCell>{item.outputValue}</TableCell>
            <TableCell>{item.inputAsset}</TableCell>
            <TableCell>{item.inputValue}</TableCell>
            <TableCell>{item.feeAsset}</TableCell>
            <TableCell>{item.feeValue}</TableCell>
        </React.Fragment>
    )
};

const TestingRow = (props: any) => {
    const { item } = props;

    return (
        <TableRow className="odd">
            <Row item={item} />
        </TableRow>
    )
};

const ExportRow = (props: any) => {
    const { item } = props;

    return (
        <TableRow>
            <Row item={item} />
        </TableRow>
    )
};

const ExportUzan = () => {
    //Variables
    const apiCaller = new ApiOperations();

    //States
    const [exported, setExported] = useState([]);
    const [testing, setTesting] = useState([]);
    const [aggExported, setAggExported] = useState({ fees: [], outputs: [], inputs: [] });
    const [aggTesting, setAggTesting] = useState({ fees: [], outputs: [], inputs: [] });
    const [inProgress, setInProgress] = useState<number>(-1);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/assetsEvolution/forLawyer', 'taxesCalculator');
        if (res !== undefined) {
            const { dataExported, testingData, aggExports, testAggExports } = res;
            setTesting(testingData);
            setExported(dataExported);
            setAggExported(aggExports);
            setAggTesting(testAggExports);
            //findNotMatchingRow(dataExported, testingData);
        }
        setInProgress(-1);
    };

    const findNotMatchingRow = (exported: any, testing: any) => {
        const missingRows: any = [];
        for (const item of exported) {
            const { date, outputAsset } = item;
            const hasTestingRow = testing.filter((el: any) => el.date.substring(0, 10) === date.substring(0, 10)
                && el.outputAsset === outputAsset
                /*&& el.inputAsset === item.inputAsset 
                && el.feeAsset === item.feeAsset*/
            );
            if (hasTestingRow.length < 1) {
                missingRows.push(item);
            }
        }
        setExported(missingRows);
    };


    const findTestingRowForDate = (item: any) => {
        const hasTestingRow = testing.filter((el: any) => el.date === item.date
            && el.outputAsset === item.outputAsset
            /*&& el.inputAsset === item.inputAsset 
            && el.feeAsset === item.feeAsset*/
        );
        if (hasTestingRow.length === 1) {
            return hasTestingRow[0];
        }
        else if (hasTestingRow.length > 1) {
            console.log('More than 1');
            return hasTestingRow[0];
        }
        else {
            console.log('Nope');
            return null;
        }
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
            <br />
            <br />
            <br />
            {inProgress === 1 &&
                <Box mb={2}>
                    <Loader message="Action en cours" />
                </Box>
            }
            {inProgress === 2 &&
                <Table sx={defaultStyles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Plateforme d'échange ou autre</TableCell>
                            <TableCell>Monnaie tradée</TableCell>
                            <TableCell>Montant tradé</TableCell>
                            <TableCell>Monnaie reçue</TableCell>
                            <TableCell>Montant reçu</TableCell>
                            <TableCell>Monnaie frais</TableCell>
                            <TableCell>Montant frais</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exported.filter((el: any) => !['Kucoin', 'HardWalletNeo', 'HardWalletMain', 'HardWalletSecond'].includes(el.exchange) && el.date <= '2021-09-21 20:30:01').map((item: any, index: number) => (
                            <React.Fragment key={index}>
                                <ExportRow item={item} />
                                {findTestingRowForDate(item) !== null ? <TestingRow item={findTestingRowForDate(item)} /> :
                                    <TableRow className="even">
                                        <TableCell colSpan={8}>-</TableCell>
                                    </TableRow>
                                }

                            </React.Fragment>
                        )

                        )}
                    </TableBody>
                </Table>
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
