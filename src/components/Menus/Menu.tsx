/********** [  LIBRARIES  ] ***************/
import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Style
import { theme, palette } from '../../assets/styles/theme';
/********** [ PROPERTIES ] ****************/
//Style
const styles = {
    toolbar: {
        background: palette.secondary.dark,
        display: 'flex'
    },
    tab: {
        color: palette.background.pale,
        padding: '0.2em',
        borderBottom: '3px solid transparent',
        '&:hover': {
            borderBottom: '3px solid orange',
        },
        '&.selected': {
            borderBottom: `3px solid ${palette.primary.main}`,
        },
    }
};


/*********** [ COMPONENT ] ****************/
const MenuTabs = (props: any) => {
    const { url, label, selectedMenuItem } = props;
    const [selected, isSelected] = useState<boolean>(false);

    //Functions
    const throwSelected = () => {
        isSelected(true);
    }

    //Effects
    useEffect(() => {
        if (selectedMenuItem === label) throwSelected();
    });

    //Render
    return (
        <Box sx={(selected) ? { ...styles.tab, borderBottom: `3px solid ${palette.primary.main}` } : styles.tab}>
            <Button component={NavLink} to={url} sx={{ color: palette.background.pale }}>{label}</Button>
        </Box>
    );
};

const Menu = (props: any) => {
    const { items, selectedMenuItem } = props;
  
    //Render
    return (
        <Box sx={styles.toolbar}>
            {items.map((item: any, index: number) =>
                <MenuTabs key={index} url={item.url} label={item.label} selectedMenuItem={selectedMenuItem}/>
            )}
        </Box>
    );
};

export default memo(Menu);