/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import ExchangeFilenameDir from './FilesLoaded/ExchangeFilenameDirs';
//Api
import ApiOperations from '../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const FilesLoaded = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States
    const [filesByExchange, setFilesByExchange] = useState([]);
    const [transactionFilesToLoad, setTransactionFilesToLoad] = useState<Array<string>>([]);
    const [inProgress, setInProgress] = useState<number>(-1);

    //Functions
    const init = async () => {
        const res = await apiCaller.get('files/checkTransactionsFileToInsert', 'loader');
        if (res !== undefined) {
            setFilesByExchange(res.filesByFolder);
        }
    };

    const setTransactionsFilesToLoad = (filepath: string, market: string, status: boolean) => {
        const itemToHandle = { market: market, filepath: filepath };
        const existItem = transactionFilesToLoad.filter((el: any) => el.filepath === filepath);
        if (existItem.length < 1 && status) {
            setTransactionFilesToLoad((prev: any) => prev.concat([itemToHandle]));
        }
        else if (!status && existItem.length > 0) {
            const newList = transactionFilesToLoad.filter((el: any) => el.filepath !== filepath);
            setTransactionFilesToLoad(newList);
        }
    };

    const launchTransactionsFilesInsertion = async () => {
        const files = filesByExchange
            .map((el: any) => el.dirs)
            .flat()
            .map((el: any) => ({
                filepath: el.files.filter((el: any) => el.path.match(/transactionsToInsert/) !== null)[0].path,
                market: el.market
            }))
            .flat();
        setInProgress(1);
        for (const file of files) {
            await launchTransactionsFileInsertion(file);
        }
        setInProgress(-1);
        //for (let index = 0; index < transactionFilesToLoad.length; index++) {
        //    const file = transactionFilesToLoad[index];
        //    await launchTransactionsFileInsertion(file);
        //}
    }

    const launchTransactionsFileInsertion = async (file: any) => {
        const res = await apiCaller.post('transactionsFile/insertion', { file: file }, 'loader');
        //setLoadedFile(res);
    }

    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {inProgress === -1 && 
                    <Button variant="contained" onClick={launchTransactionsFilesInsertion}>Lancer Insertion des fichiers de transactions</Button>
                }
                {inProgress === 1 &&
                    <Loader message="Action en cours" />
                }
                {filesByExchange.map((item: any, index: number) =>
                    <Box key={index} >
                        <h1>{item.exchange}</h1>
                        <Table sx={defaultStyles.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nom du dossier</TableCell>
                                    <TableCell>Marché</TableCell>
                                    <TableCell>Voir Lignes rejetées</TableCell>
                                    <TableCell>Lignes rejetées</TableCell>
                                    <TableCell>Lignes conservées</TableCell>
                                    <TableCell>Transactions générées</TableCell>
                                    <TableCell>Transactions à insérer</TableCell>
                                    <TableCell>Statut</TableCell>
                                    <TableCell>Prêt pour insertion ?</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {item.dirs.map((directory: any, index: number) =>
                                    <ExchangeFilenameDir key={index}
                                        exchange={item.exchange}
                                        directory={directory}
                                        setTransactionsFilesToLoad={setTransactionsFilesToLoad}
                                    />
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                )}
            </Grid>
        </Grid>
    );
};

export default FilesLoaded;