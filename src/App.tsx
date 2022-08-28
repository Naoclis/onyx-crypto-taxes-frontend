/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import AppRoutes from './components/Routes';
/********** [ PROPERTIES ] ****************/
//Style
import { theme } from './assets/styles/theme';

/*********** [ COMPONENT ] ****************/
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <AppRoutes />
            </main>
        </ThemeProvider>
    );
};

export default App;