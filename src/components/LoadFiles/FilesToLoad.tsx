/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import Loader from '../../components/UIElements/Loader';
import FilesByExchange from './FilesToLoad/FilesByExchange';
import FileLoadedKPI from './FilesToLoad/FileLoadedKpi'; 
import FilesAlreadyLoaded from './FilesToLoad/FilesAlreadyLoaded';
//Api
import ApiOperations from '../../shared/apiOperations';
/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const FilesToLoad = () => {
    //Variables
    const apiCaller = new ApiOperations();
    //States
    const [filesNotLoaded, setFilesNotLoaded] = useState([]);
    const [loadedFiles, setLoadedFiles] = useState([]);
    const [loadedFile, setLoadedFile] = useState();
    const [inProgress, setInProgress] = useState<number>(-1);

    //Functions
    const init = async () => {
        const res = await apiCaller.get('files/check/sourceFiles', 'loader');
        if (res !== undefined) {
            setFilesNotLoaded(res.filesByFolder);
            setLoadedFiles(res.filesAlreadyLoaded);
        }
    };

    const loadAllFiles = async () => {
        const files = filesNotLoaded.map((el: any) => el.files).flat();
        setInProgress(1);
        for (const file of files) {
            await loadFile(file);
        }
        setInProgress(-1);
    };

    const loadFile = async (file: any) => {
        setInProgress(1);
        const data = { path: file.path, exchange: file.account, type: file.subAccount };
        const res = await apiCaller.post('file/generateTransactionFiles', data, 'loader');
        if (res !== undefined) {
            setLoadedFile(res);
            setInProgress(-1);
        }
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
            <Grid item xs={12}>

                {inProgress === -1 &&
                    <Box display="flex" sx={{ '> .MuiButtonBase-root': { marginRight: '1em' } }}>
                        <Button variant="contained" color="primary" onClick={deleteLogs}>Supprimer fichiers de transactions</Button>
                        <Button variant="contained" color="primary" onClick={loadAllFiles}>Générer tous les fichiers de transactions</Button>
                    </Box>
                }
                {inProgress === 1 &&
                    <Loader message="Action en cours" />
                }
            </Grid>
            <Grid item xs={6}>
                <h3>Liste des fichiers présents dans les répertoires, qu'il est possible de charger</h3>
                {loadedFile !== undefined && <FileLoadedKPI res={loadedFile} />}
                {filesNotLoaded.map((item: any, index: number) =>
                    <Box key={index} >
                        <h1>{item.exchange}</h1>
                        <FilesByExchange files={item.files} loadFile={loadFile} />
                    </Box>
                )}
            </Grid>
            <Grid item xs={6}>
                <h3>Liste des fichiers déjà chargés</h3>
                {loadedFiles.map((item: any, index: number) =>
                    <Box key={index} >
                        <h1>{item.source}</h1>
                        <FilesAlreadyLoaded files={item.files}/>
                    </Box>
                )}
            </Grid>
        </Grid>
    );
};

export default FilesToLoad;