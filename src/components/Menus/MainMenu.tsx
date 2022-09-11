/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Tooltip, Toolbar, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
/********* [ MY LIBRARIES ] ***************/
//Style
import { theme, palette } from '../../assets/styles/theme';
/********** [ PROPERTIES ] ****************/
//Style
const styles = {
    toolbar: {
        background: palette.background.black,
        display: "flex",
        justifyContent: "space-between"
    },
    links: {
        '& > a': {
            margin: theme.spacing(1),
        }
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        fontSize: '1em'
    },
};

/*********** [ COMPONENT ] ****************/
const MenuIcon = (props: any) => {
    const { icon, title, url } = props;
    return (
        <Tooltip title={title}>
            <IconButton component={NavLink} to={url} size="large">
                {icon}
            </IconButton>
        </Tooltip>
    );
};

const Menu = () => {
    return (
        <AppBar position="static">
            <Toolbar sx={styles.toolbar}>
                <Box display='flex' alignItems='center'>
                    <CurrencyBitcoinIcon fontSize="large"/>
                    <Typography variant="h6" sx={styles.title}>
                        ONYX CRYPTO
                    </Typography>
                </Box>
                
                <Box sx={styles.links}>
                    <Button variant="outlined" color="primary" component={NavLink} to="/files/load">Gestion Fichiers Sources</Button>
                    <Button variant="outlined" color="primary" component={NavLink} to="/taxes/calculate">Calcul Impôts</Button>
                    <Button variant="outlined" color="primary" component={NavLink} to="/taxes/manage/sells">Gestion Impôts</Button>
                </Box>

                <Box sx={styles.grow} />

                <Box>
                    <MenuIcon title="Notes Projet" url="/help" icon={<HelpIcon color="primary"/>}  />
                    <MenuIcon title="Debug" url="/debug" icon={<ImportantDevicesIcon color="primary" />}  />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default memo(Menu);