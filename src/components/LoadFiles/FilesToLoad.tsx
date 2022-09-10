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
                    <h2>Résultat du chargement du/des fichier(s) :</h2>
                    <Box>
                        Le cartouche ci-dessous montre le résultat après la lecture du fichier et la création des fichiers qui en découlent. S'il y a des rejets, et qu'ils ne sont pas normaux, il faut aller vérifier dans l'onglet "Contrôle des fichiers".
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
                            Pour gérer fichier source par fichier source la création des fichiers de transaction, pour insertion. L'insertion se fait grâce au bouton situé dans la colonne "Forcer Chargement Fichier"<br />
                            Les répertoires ne content aucun fichier qu'il serait possible d'insérer n'apparaissent pas.<br />
                            Les fichiers suivants sont en "full rejects" ET c'est normal : {acceptedRejectedFiles.toString()}
                        </Box>
                        <h3>Liste des fichiers présents dans les répertoires, qu'il est possible de charger</h3>
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

                            Pour manipuler en une seule fois tous les fichiers plats générés à partir des fichiers sources : soit les supprimer, soit les créer en masse.
                            Les fichiers plats générés sont ensuite utilisés pour être chargés dans les stagings tables.<br />
                            Les fichiers source sont chargés et analysés, puis repartis ensuite entre "lignes acceptées" et "lignes rejetés". Les lignes acceptées vont ensuite donner lieu à 2 fichiers :
                            <ul>
                                <li>un qui contiendra les transactions déjà présentes en base <i>(identifiedTransactions_yyyymmdd)</i></li>
                                <li>un qui contiendra les transactions à insérer <i>(transactionsToInsert_yyyymmdd)</i>. C'est ce dernier fichier qu'il faut insérer en base</li>
                            </ul>
                            <br />
                        </Box>
                        <Box display="flex" sx={{ '> .MuiButtonBase-root': { marginRight: '1em' } }}>
                            <Button variant="contained" color="primary" onClick={deleteLogs}>Supprimer fichiers de transactions</Button>
                            <Button variant="contained" color="primary" onClick={loadAllFiles}>Générer tous les fichiers de transactions</Button>
                        </Box>

                        <h3>Liste des fichiers déjà chargés</h3>
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