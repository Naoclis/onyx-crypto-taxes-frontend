/********** [  LIBRARIES  ] ***************/
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
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
    const acceptedRejectedFiles = ['Binance_OldTransactions_20210413-20210504.csv'];
    //States
    const [filesNotLoaded, setFilesNotLoaded] = useState([]);
    const [loadedFiles, setLoadedFiles] = useState([]);
    const [loadedFile, setLoadedFile] = useState();
    const [inProgress, setInProgress] = useState<number>(-1);

    //Functions
    const init = async () => {
        const res = await apiCaller.get('files/check/sourceFiles', 'loader');
        if (res !== undefined) {
            const files = res.filesByFolder.filter((el: any) => {
                const allFilesNames = el.files.map((file: any) => file.name).filter((filename: string) => acceptedRejectedFiles.includes(filename) === false);
                return (allFilesNames.length > 0);
            });

            setFilesNotLoaded(files);
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
                <Box>
                    <h2>R??sultat du chargement du/des fichier(s) :</h2>
                    <Box>
                        Le cartouche ci-dessous montre le r??sultat apr??s la lecture du fichier et la cr??ation des fichiers qui en d??coulent. S'il y a des rejets, et qu'ils ne sont pas normaux, il faut aller v??rifier dans l'onglet "Contr??le des fichiers".
                    </Box>
                    {loadedFile !== undefined && <FileLoadedKPI res={loadedFile} />}
                </Box>
            </Grid>
            <Grid item xs={6}>
                {inProgress === 1 &&
                    <Loader message="Action en cours" />
                }

                {inProgress === -1 &&
                    <Box>
                        <h2>Manipulation unitaire des fichiers</h2>
                        <Box>
                            Pour g??rer fichier source par fichier source la cr??ation des fichiers de transaction, pour insertion. L'insertion se fait gr??ce au bouton situ?? dans la colonne "Forcer Chargement Fichier"<br />
                            Les r??pertoires ne content aucun fichier qu'il serait possible d'ins??rer n'apparaissent pas.<br />
                            Les fichiers suivants sont en "full rejects" ET c'est normal : {acceptedRejectedFiles.toString()}
                        </Box>
                        <h3>Liste des fichiers pr??sents dans les r??pertoires, qu'il est possible de charger</h3>
                        {filesNotLoaded.map((item: any, index: number) =>
                            <Box key={index} >
                                <h1>{item.exchange}</h1>
                                <FilesByExchange files={item.files} loadFile={loadFile} rejectedFiles={acceptedRejectedFiles} />
                            </Box>
                        )}
                    </Box>
                }
            </Grid>

            <Grid item xs={6}>

                {inProgress === 1 &&
                    <Loader message="Action en cours" />
                }
                {inProgress === -1 &&
                    <Box>
                        <h2>Manipulation en masse des fichiers</h2>
                        <Box mb={2}>

                            Pour manipuler en une seule fois tous les fichiers plats g??n??r??s ?? partir des fichiers sources : soit les supprimer, soit les cr??er en masse.
                            Les fichiers plats g??n??r??s sont ensuite utilis??s pour ??tre charg??s dans les stagings tables.<br />
                            Les fichiers source sont charg??s et analys??s, puis repartis ensuite entre "lignes accept??es" et "lignes rejet??s". Les lignes accept??es vont ensuite donner lieu ?? 2 fichiers :
                            <ul>
                                <li>un qui contiendra les transactions d??j?? pr??sentes en base <i>(identifiedTransactions_yyyymmdd)</i></li>
                                <li>un qui contiendra les transactions ?? ins??rer <i>(transactionsToInsert_yyyymmdd)</i>. C'est ce dernier fichier qu'il faut ins??rer en base</li>
                            </ul>
                            <br />
                        </Box>
                        <Box display="flex" sx={{ '> .MuiButtonBase-root': { marginRight: '1em' } }}>
                            <Button variant="contained" color="primary" onClick={deleteLogs}>Supprimer fichiers de transactions</Button>
                            <Button variant="contained" color="primary" onClick={loadAllFiles}>G??n??rer tous les fichiers de transactions</Button>
                        </Box>

                        <h3>Liste des fichiers d??j?? charg??s</h3>
                        {loadedFiles.map((item: any, index: number) =>
                            <Box key={index} >
                                <h1>{item.source}</h1>
                                <FilesAlreadyLoaded files={item.files} />
                            </Box>
                        )}
                    </Box>
                }

            </Grid>
        </Grid>
    );
};

export default FilesToLoad;