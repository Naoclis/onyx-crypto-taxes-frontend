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
    const [insertedFiles, setInsertedFiles] = useState([]);
    //Functions
    const init = async () => {
        const res = await apiCaller.get('files/check/transactionsFiles', 'loader');
        if (res !== undefined) {
            const files = res.filesByFolder.filter((el: any) => el.dirs.length > 0);
            setFilesByExchange(files);
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

    const insertFiles = async (mode: string) => {
        setInProgress(1);
        if (mode === 'all')
            await loadAll();
        else
            await loadSelectedFilesAll();
        setInProgress(-1);
    }

    const loadAll = async () => {
        const files = filesByExchange
            .map((el: any) => el.dirs)
            .flat()
            .map((el: any) => ({
                filepath: el.files.filter((el: any) => el.path.match(/transactionsToInsert/) !== null)[0].path,
                market: el.market
            }))
            .flat();
        for (const file of files) {
            await launchTransactionsFileInsertion(file);
        }
    }

    const loadSelectedFilesAll = async () => {
        for (let index = 0; index < transactionFilesToLoad.length; index++) {
            const file = transactionFilesToLoad[index];
            await launchTransactionsFileInsertion(file);
        }
    }

    const launchTransactionsFileInsertion = async (file: any) => {
        const res = await apiCaller.post('transactionsFile/insertion', { file: file }, 'loader');
        if (res !== undefined) {
            const { file, inserted } = res.results;
            const item = { name: file, nbLines: inserted.length };
            setInsertedFiles((prev: any) => prev.concat(item));
        }
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
                    <Box>
                        <h3>Liste des fichiers traités pour créer des fichiers de transactions</h3>
                        Pour chaque fichier, je présente la vision des lignes et transactions créés, sachant que je n'affiche plus les fichiers déjà inserés en base.
                        <br />

                        Le champ <Box color='warning.main' display='inline'>"Prêt pour insertion"</Box> me permet d'indiquer, pour un fichier, s'il est prêt pour être insérer dans la staging area.

                        <Box mt={2}>
                            <Button variant="contained" onClick={() => insertFiles('flagged')} sx={{ marginRight: '1em' }}>Insérer Fichiers Sélectionnés</Button>
                            <Button variant="contained" onClick={() => insertFiles('all')}>Insérer Tous les Fichiers</Button>
                        </Box>
                    </Box>
                }
                {inProgress === 1 &&
                    <Loader message="Action en cours" />
                }
            </Grid>
            <Grid item xs={12}>
                {(inProgress === -1 && insertedFiles.length > 0) &&
                    <Box>
                        <h3>Résultat de l'insertion des fichiers de transactions : </h3>
                        <Table width={300}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dossier</TableCell>
                                    <TableCell>Nom Fichier</TableCell>
                                    <TableCell>Nb Lignes insérées</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {insertedFiles.map((file: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{file.name.split('/').slice(0, -2).join('/')}</TableCell>
                                        <TableCell>{file.name.split('/').slice(-1).join('/')}</TableCell>
                                        <TableCell><Box color='info.main' display='inline'>{file.nbLines}</Box></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                }
                {inProgress === 1 &&
                    <Loader message="Action en cours" />
                }
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ fontSize: '0.8em' }}>
                    <b>Notes : </b>
                    <br />
                    <ul>
                        <li>
                            Pour le filtre sur les opérations, il y a un recoupement entre les fichiers Binance "Transactions" et "Futures". Il est donc normal que certains types ne soient pas traités pour l'un ou l'autre des fichiers pour Binance.
                        </li>
                        <li>
                            Ainsi, dans le fichier Futures, je ne traite que les types : ['FUNDING_FEE', 'COMMISSION', 'REALIZED_PNL'], qui correspondent aux actions sur les contrats Futures.
                        </li>
                        <li>
                            Dans le fichier Transactions, je ne traite que les types : ['Deposit', 'The Easiest Way to Trade', 'transfer_in', 'transfer_out', 'Distribution', 'Withdraw', 'Insurance fund compensation', 'Liquid Swap rewards', 'Locked Staking', 'Launchpool Interest', 'Savings Interest', 'POS savings interest'].<br />
                            En effet, pour le reste : 
                            <ul>
                                <li>"funding_fee", "commission" et "realized_pnl" sont traités dans le fichier "future"</li>
                                <li>"fee", "sell", "buy" sont traités dans le par le fichier "spot"</li>
                                <li>"Liquid Swap add/sell", "Savings purchase", "POS savings redemption", "POS savings purchase" sont des déplacements de crypto vers les solutions de staking, et donc ce n'est pas une évolution du portefeuille. Je ne dois pas le prendre en compte pour la vision du wallet global.</li>
                                <li>"Large OTC trading" et "Buy Crypto" sont traités par fichier manuel.</li>
                                <li>"Margin loan", "Margin Repayment" sont gérés manuellement pour le moment dans un fichier manuel, parce que je n'ai fait qu'une seule tentative. Si à l'avenir, j'utilise vraiment mon compte Margin, il faudra que je fasse des exports de fichiers comme pour le marché Future et le Spot;
                                </li>
                            </ul>

                        </li>
                    </ul>
                </Box>
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