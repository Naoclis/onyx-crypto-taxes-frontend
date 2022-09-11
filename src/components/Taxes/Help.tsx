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
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <h1>Calcul des impôts sur les plus-values</h1>
                <h3>Règles fiscales utilisées : celles de 2019</h3>
                <h4>Date de dernière mise à jour de ce guide : 09/09/2022</h4>
                En 2022, pour les cryptos, il y a pas mal d'hypothèses à prendre pour faire sa déclaration au FISC français.<br />
                On va toujours aller au plus simple en partant du principe fondamental : seule la conversion en <b>monnaie FIAT</b> est imposable.<br />
                Les grands principes :
                <ul>
                    <li>Le FISC se base sur un principe de portefeuille "unique", à savoir que tous les contenus de chaque wallet est considéré comme faisant parti d'un grand tout unique</li>
                    <li>Il y a 2 grands types de mouvements : les mouvements crypto - crypto, et les mouvements crypto - fiat. Les mouvements entre crypto ne créént pas d'imposition, seuls les mouvements FIAT le font. Néanmoins, comme ils augmentent/diminuent le volume présent dans le portefeuille "unique", il faut les suivre.</li>
                    <li>La déclaration se fait sur une année calendaire, du 01/01 au 31/12.</li>
                    <li>Il faut avoir le statut de la dernière cession du portefeuille au début de l'année : 01/01/20XX, à 00:00:00, car on utilise ces éléments pour le calcul de l'année suivante</li>
                </ul>
            </Grid>
            <Grid item xs={12}>
                <h3>Procédure de calcul des plus-values</h3>
                <ol>
                    <li>
                        Déterminer l'évolution dans le temp du volume de chaque asset du portefeuille.<br />
                        Cela revient à lister, pour chaque asset, tous les achats/ventes, dépots, échanges, etc. qu'il a connu, pour avoir la vision à un instant T de sa quantité précise présente dans le portefeuille unique.<br />
                        Je créé ainsi une vision "portefeuille unique" <i>(assetsEvolution)</i>
                    </li>
                    <li>
                        Chaque cession FIAT nécessitant d'avoir la vision de la valeur du portefeuille au moment de la cession, il faut créer cette vision. Pour cela, je créé :
                        <ul>
                            <li>d'abord la vision de toutes les cessions FIAT de l'année <i>(fiatSellOrders)</i></li>
                            <li>
                                puis un état pour chaque année, qui contient le statut du volume de chaque asset à la date de chaque cession <i>(table fiatSellOrdersWalletStates)</i>
                            </li>
                        </ul>
                    </li>
                    <li>
                        J'utilise aussi la vue "portefeuille unique" pour me créer une vision du 01/01 de mon portefeuille et de sa constitution : c'est une vision simple qui montre la quantité de chaque asset en début d'année.
                        <i>(table fdyWalletStates)</i>
                    </li>
                    <li>
                        Une fois que j'ai la vision du portefeuille à la date de chaque cession, je calcule sa valorisation avec les fichiers que je génère depuis CoinMarketCap, via API.
                        <i>(table valorizationWalletStates)</i>
                    </li>
                    <li>
                        Enfin, une fois tous ces éléments réunis, je peux calculer les taxes sur les plus-values.<br />
                        Pour m'aider dans le calcul, je créé un aggrégat qui contient, pour chaque date de cession, la valeur du portefeuille et le prix d'acquisition total<i>(table agg_valorizationAndInvestments)</i>
                        <br />
                        Puis je réalise le calcul final des taxes<i>(table taxesStates)</i>
                    </li>
                </ol>
            </Grid>

        </Grid>
    );
};

export default Help;