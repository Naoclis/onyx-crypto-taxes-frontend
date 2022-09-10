/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import FilesAlreadyLoaded from './FilesToLoad/FilesAlreadyLoaded';
//Api
import ApiOperations from '../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../assets/styles/theme';


/*********** [ COMPONENT ] ****************/
const FilesLoaded = () => {
    //Variables
    const apiCaller = new ApiOperations();
    const wallets = [
        { type: 'eth', name: 'HardWalletTokenSets', address: '0x2b7cc0cC5158f8bE331b250c2F70A73798a3d0EC', urlRoot: 'https://etherscan.io/', lastLook: '09/09/2022' },
        { type: 'eth', name: 'HardWalletMain', address: '0xAFEFF14609AbA798B293f0fB4cB20d370069F797', urlRoot: 'https://etherscan.io/', lastLook: '-1' },
        { type: 'eth', name: 'HardWalletSecond', address: '0xE2e66F73afe61CAE408AE0fCEE0802dFF79a30ec', urlRoot: 'https://etherscan.io/', lastLook: '-1' },
        { type: 'bsc', name: 'HardWalletPancakeSwap', address: '0xE2e66F73afe61CAE408AE0fCEE0802dFF79a30ec', urlRoot: 'https://bscscan.com/', lastLook: '-1' },
    ];

    //States
    const [loadedFiles, setLoadedFiles] = useState([]);
    const [inProgress, setInProgress] = useState<number>(-1);

    //Functions
    const init = async () => {
        const res = await apiCaller.get('files/check/lastLoadedFiles', 'loader');
        setInProgress(1);
        if (res !== undefined) {
            setLoadedFiles(res.filesAlreadyLoaded);
        }
        setInProgress(-1);
    };

    const needRefresh = (walletName: string, stillActive: boolean) => {
        const test = wallets.filter((el: any) => el.name === walletName);
        let lastLook = '-1';
        if (test.length > 0) {
            lastLook = test[0].lastLook;
        }
        let message = `Rafraichissement inutile`;
        if (stillActive && lastLook === '-1') {
            message = `A rafraîchir`;
        }
        else if (lastLook !== '-1') {
            message = `${message} (dernier coup d'oeil en date du : ${lastLook})`;
        }
        return message;
    };

    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={2}>

            <Grid item xs={6}>
                <Box p={2}>
                    <h4>Binance</h4>

                    <h5>Spot et Future</h5>
                    Binance a un mode de fonctionnement bien particulier pour que je puisse aggréger correctement les données. Je dois récupérer l'historique des ordres Spot, puis des ordres Futures et enfin le fichier complet de toutes les transactions <i>(qui va contenir la même vision que les fichiers "Spot" et "Futures", mais sous un format différent)</i> pour ajouter les éléments comme les dépôts qui seront absent des 2 autres fichiers.
                    <ul>
                        <li><b>Marché Spot</b> : Il faut aller dans "Ordres &gt; Ordre Spot &gt; Historique des Trades &gt; Exporter l'historique des trades récents"</li>
                        <li><b>Marché Futures</b> : Il faut aller dans "Ordres &gt; Ordre de contrat à terme &gt; Historique des Transactions &gt; Exporter l'historique des transactions", en sélectionnant la période concernée</li>
                        <li>Il faut enfin aller dans "Vue d'ensemble du portefeuille &gt; Historique des transactions &gt;  Générer un relevé complet" et prendre la période souhaitée.<br />Pensez à bien cocher "Masquer l'historique des transferts", qui donne des infos peu pertinentes pour la déclaration fiscale.<br />
                        </li>
                        <li><b>Cas particulier 1</b> : pour les lignes spécifiques "Transactions Related", je les ajoute manuelle dans le fichier "Spot", parce qu'il s'agit de conversion EUR vers Crypto (donc achat de stable coins)
                        </li>
                        <li><b>Cas particulier 2</b> : Binance gère à part les achats par carte bancaire. Pour retrouver les ordres, il faut aller dans "Historique achat/vente". Pour le moment, je me suis contenté d'ajouter manuellement ces éléments plutôt que de gérer l'import d'un fichier plat, car ce sont des opérations que je ferais rarement.
                        </li>
                    </ul>
                    <h5>Staking (ajouté le 09/2021)</h5>
                    <ul>
                        <li>Binance Staking : les portefeuilles communiquants entre eux, je récupère déjà les éléments dans les fichiers Binance précédents. C'est simple : ce qui est staké ne sort pas de mon portefeuille <i>(donc je ne réduis pas les quantités)</i>, j'ai donc simplement à charger les "rewards" de Binance pour les "Liquid Swap" et le "Staking". </li>
                        <li>Ils ont des typologies bien claires dans le fichier Transactions : "Locked Staking", "Liquid Swap", "Savings interest", etc. Je peux les voir sur Binance quand je fais "Transaction History &gt; Distribution"</li>
                    </ul>
                </Box>

                <Box p={2}>
                    <h4>Bitstamp</h4>
                    <ul>
                        <li>Il faut aller dans "Transaction history". Puis cliquez sur "Export", en haut, à gauche. Et enfin, faire un "Export All", qui va générer un fichier qui contient tout depuis le début</li>
                    </ul>
                </Box>
                <Box p={2}>
                    <h4>Kucoin</h4>
                    <ul>
                        <li>Il faut aller dans "Orders &gt; Spot Order &gt; Trade History"</li>
                    </ul>
                </Box>
                <Box p={2}>
                    <h4>Cold Wallets</h4>
                    <ul>
                        {wallets.map((wallet: any, index: number) => (
                            <li key={index}>
                                {wallet.name} =&gt;
                                &nbsp;
                                <Link href={`${wallet.urlRoot}exportData?type=address&a=${wallet.address}`} target="_blank">Transactions</Link>
                                &nbsp;-&nbsp;
                                <Link href={`${wallet.urlRoot}exportData?type=internaltxns&a=${wallet.address}`} target="_blank">Internal</Link>
                                &nbsp;-&nbsp;
                                <Link href={`${wallet.urlRoot}exportData?type=addresstokentxns&a=${wallet.address}`} target="_blank">Others</Link>
                            </li>
                        ))}
                    </ul>

                    <ul>
                        <li>Il faut aller sur l'adresse et utiliser la fonction "Download CSV Export" : Transactions, Internal (quand il existe), "Erc20" (ou autres) Tokens Txns (liens ci-avant)
                        </li>
                        <li>Pensez à regarder si les fichiers n'ont pas une colonne en trop à la fin, pour les wallets en ETH.
                        </li>
                    </ul>
                </Box>

            </Grid>

            <Grid item xs={6}>
                {inProgress === 1 &&
                    <Loader message="Action en cours" />
                }
                {inProgress === -1 &&
                    <Box>
                        <h2>Dernière période chargée par Exchange/Wallet :</h2>

                        <h3>Liste des fichiers déjà chargés</h3>

                        <Box >
                            {loadedFiles.map((source: any, index: number) =>
                                <Box key={index}>
                                    <h4>{source.source}</h4>
                                    <Table sx={defaultStyles.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Source</TableCell>
                                                <TableCell>Période</TableCell>
                                                <TableCell>Nb Lignes</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {source.types.map((file: any, _index: number) =>
                                                <TableRow className={(needRefresh(source.source, file.stillActive) === `A rafraîchir`) ? 'odd' : 'even'} key={_index}>
                                                    <TableCell>{file.type}</TableCell>
                                                    <TableCell>{file.lastestFile}</TableCell>
                                                    <TableCell>{needRefresh(source.source, file.stillActive)}</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </Box>
                            )}


                        </Box>
                    </Box>
                }
            </Grid>
        </Grid>
    );
};

export default FilesLoaded;