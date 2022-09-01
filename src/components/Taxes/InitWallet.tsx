/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import MyComboBox from '../../components/UIElements/MyComboBox';
import AssetsWallet from './InitWallet/AssetsWallet';
//Api
import ApiOperations from '../../shared/apiOperations';

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const InitWallet = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States
    const [uniqueWallet, setUniqueWallet] = useState<any>([]);
    const [filteredWallet, setFilteredWallet] = useState([]);
    const [inProgress, setInProgress] = useState<number>(-1);
    const [assetsStatus, setAssetsStatus] = useState([]);
    const [assetsList, setAssetsList] = useState([]);
    //Functions
    const init = async () => {
        setInProgress(1);
        const res = await apiCaller.get('get/assetsEvolution/all', 'taxesCalculator');
        if (res !== undefined) {
            const assetsList = res.assets.sort().map((item: any) => ({ _id: item, label: item }));
            setAssetsList(assetsList);
            setUniqueWallet(res.wallet);
            setFilteredWallet(res.wallet.filter((el: any) => el.asset === 'CAKE'));
            setInProgress(-1);
        }
    };

    const updateAssetsEvolution = async () => {
        setInProgress(1);
        const res = await apiCaller.get('generate/wallet', 'taxesCalculator');
        if (res !== undefined) {
            await init();
        }
    };

    const selectAsset = (value:any) => {
        if (value !== '-1') {
            const wallet = uniqueWallet.filter((el: any) => el.asset === value);
            setFilteredWallet(wallet);
        }
        else {
            setFilteredWallet(uniqueWallet);
        }
    }

    const updateLog = (asset:string, checked: boolean) => {
        const itemToHandle = { asset: asset, isOK: checked };
        const existItem: Array<typeof itemToHandle> = assetsStatus.filter((el: any) => el.asset === asset);
        if (existItem.length < 1) {
            setAssetsStatus((prev: any) => prev.concat([itemToHandle]));
        }
        else if (existItem.length > 0) {
            existItem[0].isOK = checked;
            setAssetsStatus((prev: any) => prev.concat());
        }
        console.log(assetsStatus);
    }

    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={4}>            
            <Grid item xs={6}>
                En 2022, pour les cryptos, il y a pas mal d'hypothèses à prendre pour faire sa déclaration au FISC français.
                On va toujours aller au plus simple en partant du principe fondamental : seule la conversion en monnaie FIAT est imposable.
                Partant de là, il va y avoir 2 grands types de mouvements : les mouvements crypto - crypto, et les mouvements crypto - fiat.
                La déclaration se fait sur une année calendaire.
                Il faut avoir le statut du portefeuille au début de l'année : 01/01/20XX, à 00:00:00
                Puis, partant de cet état, regarder toutes les transactions de l'année et, pour les mouvements crypto-fiat, calculer les plus-values.
                <ul>
                    <li>1er étape : déterminer le volume de chaque asset du portefeuille. Donc l'évolution dans le temps de la quantité de chaque asset</li>
                </ul>
                {inProgress === 1 &&
                    <Loader message="Action en cours" />
                }
                <Button variant="contained" onClick={updateAssetsEvolution}>Rafraîchir Portefeuille Suivi Evolution Assets</Button>
            </Grid>
            <Grid item xs={6}>
                Espace
            </Grid>
            <Grid item xs={6}>
                
                <MyComboBox items={assetsList} label="Choix de l'asset" id="selectAsset" onChange={selectAsset}/>
                <AssetsWallet wallet={filteredWallet} updateLog={updateLog} />
                
            </Grid>
        </Grid>
    );
};

export default InitWallet;