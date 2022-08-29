/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import FilesByExchange from './FilesToLoad/FilesByExchange';
//Api
import ApiOperations from '../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const LoadOperationsKPI = (props: any) => {
    const { file, lines, market } = props.res;

    const setKpis = () => {
        return (<Box>
            Nb de lignes rejetées : {lines.rejectedLines.length}<br />
            Nb de lignes conservées : {lines.keepedLines.length}<br />
            Nb de transactions créées : {lines.identifiedTransactions.length}<br />
            Nb de transactions à insérer : {lines.transactionsToInsert.length}<br />
        </Box>)
    };

    //Render
    return (
        <Box sx={{ border: '2px solid pink' }} p={2}>
            <h4>Fichier Chargé avec succcès</h4>
            Nom du fichier : {file}<br />
            Marché : {market}<br />
            {(lines.rejectedLines !== undefined) ? setKpis() : <p>Tout le fichier est en rejet. Cela peut etre normal pour les fichiers Binance Transactions</p>}
        </Box>
    );
}

const FilesToLoad = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States
    const [exchangeFiles, setExchangeFiles] = useState([]);
    const [loadedFile, setLoadedFile] = useState();
    const [inProgress, setInProgress] = useState<number>(-1);

    //Functions
    const init = async () => {
        const res = await apiCaller.get('files/getFilesToUpload', 'loader');
        if (res !== undefined) {
            setExchangeFiles(res.filesByFolder);
        }
    };

    const loadAllFiles = async () => {
        const files = exchangeFiles.map((el: any) => el.files).flat();
        setInProgress(1);
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await loadFile(file);
        }
        setInProgress(-1);
    };

    const loadFile = async (file: any) => {
        const data = { path: file.path, exchange: file.account, type: file.subAccount };
        const res = await apiCaller.post('file/load', data, 'loader');
        setLoadedFile(res);
    };

    const deleteLogs = async () => {
        const res = await apiCaller.get('debug/emptyLogsDir', 'debugger');
        setInProgress(1);
        if (res !== undefined) {
            setInProgress(-1);
        }
    };

    //Effects
    useEffect(() => {
        init();
    }, []);

    //Render
    return (
        <Grid container spacing={4}>
            <Grid item xs={8}>
                {inProgress === -1 &&
                    <Box display="flex" sx={{ '> .MuiButtonBase-root': { marginRight: '1em' } }}>
                        <Button variant="contained" color="primary" onClick={deleteLogs}>Supprimer fichiers de transactions</Button>
                        <Button variant="contained" color="primary" onClick={loadAllFiles}>Générer fichiers de transactions</Button>
                    </Box>
                }
                {inProgress === 1 &&
                    <Loader message="Action en cours" />
                }

                {exchangeFiles.map((item: any, index: number) =>
                    <Box key={index} >
                        <h1>{item.exchange}</h1>
                        <FilesByExchange files={item.files} loadFile={loadFile} />
                    </Box>
                )}
            </Grid>
            <Grid item xs={4}>
                {loadedFile !== undefined && <LoadOperationsKPI res={loadedFile} />}
            </Grid>
        </Grid>
    );
};

export default FilesToLoad;