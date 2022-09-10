/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Alert, Box } from '@mui/material';
import { hexToRgb } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
/********** [ PROPERTIES ] ****************/
//Style
import { palette } from '../../../assets/styles/theme';

const styles = {
    wrapper: {
        border: `2px solid ${palette.primary.main}`,
        borderRadius: '1em',
        backgroundColor: `rgba(${hexToRgb(palette.blue[700]).replace('rgb(', '').replace(')', '')}, .2)`,
    },
    title: {
        fontSize: '1.2em',
        fontWeight: 'bold'
    }
};

/*********** [ COMPONENT ] ****************/
const FileLoadedKPI = (props: any) => {
    const { file, lines, market, errors } = props.res;

    const setKpis = () => {
        return (
            <Box>
                <ul>
                    <li>
                        Sur les <Box color='info.main' display='inline'>{lines.rejectedLines.length + lines.keepedLines.length}</Box> lignes analysées du fichier,
                        il y en a <Box color='error.main' display='inline'>{lines.rejectedLines.length}</Box> rejetées et <Box color='success.main' display='inline'>{lines.keepedLines.length}</Box> acceptées.
                    </li>
                    <li>
                        Les lignes acceptées génèrent <Box color='info.main' display='inline'>{lines.identifiedTransactions.length}</Box> transactions,
                        et parmi celles-ci, <Box color='success.main' display='inline'>{lines.transactionsToInsert.length}</Box> doivent être réellement insérées en base.
                    </li>

                    {(lines.identifiedTransactions.length - lines.transactionsToInsert.length) !== 0 &&
                        <li>
                            Cela veut dire que Le{(lines.identifiedTransactions.length - lines.transactionsToInsert.length)} sont déjà présentes.
                        </li>
                    }

                </ul>
                <i>(Note: pour une analyse plus fine des lignes en rejets - quand il y en a - il faut utiliser l'onglet 'Contrôle des fichiers')</i>
            </Box>
        );
    };

    const hasErrors = () => {
        const items = [];
        for (const errorType in errors) {
            if (errors[errorType] !== 'NO_ERROR') {
                items.push(<li key={errorType}>{errors[errorType]}</li>);
            }
        }
        return (<ul>{items}</ul>);
    }

    //Render
    return (
        <Box sx={styles.wrapper} p={2} mb={2} mt={2}>
            <Box sx={styles.title}>
                {(lines.rejectedLines !== undefined) ? <Alert severity="success">Fichier manipulé avec succès !</Alert>
                    : <Alert severity="error">Fichier manipulé avec erreurs !</Alert>}
            </Box>
            <Box mt={2}>
                Nom du fichier : {file} <br />
                Marché : {market}<br />
                {(lines.rejectedLines !== undefined) ? setKpis() :
                    <Box mt={1}>
                        Tout le fichier est en rejet. Cela peut être normal pour les fichiers Binance Transactions.<br />
                        Cause(s) du rejet :
                        {hasErrors()}
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default FileLoadedKPI;