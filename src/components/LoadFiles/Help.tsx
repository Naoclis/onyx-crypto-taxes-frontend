/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Grid, Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
import { hardWalletInfos } from '../../assets/configs/walletConfig';
//Components
import Loader from '../../components/UIElements/Loader';
//Api
import ApiOperations from '../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles } from '../../assets/styles/theme';


/*********** [ COMPONENT ] ****************/
const ColdWalletExports = (props: any) => {
    const { wallet } = props;

    return (
        <li>
            {wallet.name} <i>(<Link href={`${wallet.urlRoot}address/${wallet.address}`} target="_blank">Voir</Link>)</i>
            <ul>
                <li><Link href={`${wallet.urlRoot}exportData?type=address&a=${wallet.address}`} target="_blank">Transactions</Link></li>
                <li><Link href={`${wallet.urlRoot}exportData?type=internaltxns&a=${wallet.address}`} target="_blank">Internal</Link></li>
                <li><Link href={`${wallet.urlRoot}exportData?type=addresstokentxns&a=${wallet.address}`} target="_blank">Others</Link></li>
            </ul>
        </li>
    );
};

const Help = () => {
    //Variables
    const apiCaller = new ApiOperations();

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
        const hasHardwallet = hardWalletInfos.filter((el: any) => el.name === walletName);
        let lastLook = '-1';
        if (hasHardwallet.length > 0) {
            lastLook = hasHardwallet[0].lastLook;
        }
        let message = `Rafraichissement inutile`;
        if (stillActive && lastLook === '-1') {
            message = `A rafra??chir`;
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
                    Binance a un mode de fonctionnement bien particulier pour que je puisse aggr??ger correctement les donn??es. Je dois r??cup??rer l'historique des ordres Spot, puis des ordres Futures et enfin le fichier complet de toutes les transactions <i>(qui va contenir la m??me vision que les fichiers "Spot" et "Futures", mais sous un format diff??rent)</i> pour ajouter les ??l??ments comme les d??p??ts qui seront absent des 2 autres fichiers.
                    <ul>
                        <li><b>March?? Spot</b> : Il faut aller dans "Ordres &gt; Ordre Spot &gt; Historique des Trades &gt; Exporter l'historique des trades r??cents"</li>
                        <li><b>March?? Futures</b> : Il faut aller dans "Ordres &gt; Ordre de contrat ?? terme &gt; Historique des Transactions &gt; Exporter l'historique des transactions", en s??lectionnant la p??riode concern??e</li>
                        <li>Il faut enfin aller dans "Vue d'ensemble du portefeuille &gt; Historique des transactions &gt;  G??n??rer un relev?? complet" et prendre la p??riode souhait??e.<br />Pensez ?? bien cocher "Masquer l'historique des transferts", qui donne des infos peu pertinentes pour la d??claration fiscale.<br />
                        </li>
                        <li><b>Cas particulier 1</b> : pour les lignes sp??cifiques "Transactions Related", je les ajoute manuelle dans le fichier "Spot", parce qu'il s'agit de conversion EUR vers Crypto (donc achat de stable coins)
                        </li>
                        <li><b>Cas particulier 2</b> : Binance g??re ?? part les achats par carte bancaire. Pour retrouver les ordres, il faut aller dans "Historique achat/vente". Pour le moment, je me suis content?? d'ajouter manuellement ces ??l??ments plut??t que de g??rer l'import d'un fichier plat, car ce sont des op??rations que je ferais rarement.
                        </li>
                    </ul>
                    <h5>Staking (ajout?? le 09/2021)</h5>
                    <ul>
                        <li>Binance Staking : les portefeuilles communiquants entre eux, je r??cup??re d??j?? les ??l??ments dans les fichiers Binance pr??c??dents. C'est simple : ce qui est stak?? ne sort pas de mon portefeuille <i>(donc je ne r??duis pas les quantit??s)</i>, j'ai donc simplement ?? charger les "rewards" de Binance pour les "Liquid Swap" et le "Staking". </li>
                        <li>Ils ont des typologies bien claires dans le fichier Transactions : "Locked Staking", "Liquid Swap", "Savings interest", etc. Je peux les voir sur Binance quand je fais "Transaction History &gt; Distribution"</li>
                    </ul>
                </Box>

                <Box p={2}>
                    <h4>Bitstamp</h4>
                    <ul>
                        <li>Il faut aller dans "Transaction history". Puis cliquez sur "Export", en haut, ?? gauche. Et enfin, faire un "Export All", qui va g??n??rer un fichier qui contient tout depuis le d??but</li>
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
                        {hardWalletInfos.filter((wallet:any)=>!wallet.inactive).map((wallet: any, index: number) => (
                            <ColdWalletExports key={index} wallet={wallet}/>
                        ))}
                    </ul>

                    <ul>
                        <li>Il faut aller sur l'adresse et utiliser la fonction "Download CSV Export" : Transactions, Internal (quand il existe), "Erc20" (ou autres) Tokens Txns (liens ci-avant)
                        </li>
                        <li>Pensez ?? regarder si les fichiers n'ont pas une colonne en trop ?? la fin, pour les wallets en ETH.
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
                        <h2>Derni??re p??riode charg??e par Exchange/Wallet :</h2>

                        <h3>Liste des fichiers d??j?? charg??s</h3>

                        <Box >
                            {loadedFiles.map((source: any, index: number) =>
                                <Box key={index}>
                                    <h4>{source.source}</h4>
                                    <Table sx={defaultStyles.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Source</TableCell>
                                                <TableCell>P??riode</TableCell>
                                                <TableCell>Nb Lignes</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {source.types.map((file: any, _index: number) =>
                                                <TableRow className={(needRefresh(source.source, file.stillActive) === `A rafra??chir`) ? 'odd' : 'even'} key={_index}>
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

export default Help;