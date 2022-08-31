/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
/********* [ MY LIBRARIES ] ***************/
//Components
import LoadFiles from '../views/Admin/LoadFiles/ListFiles';
import ControlFiles from '../views/Admin/LoadFiles/ControlFiles';
import ControlDatabase from '../views/Admin/LoadFiles/ControlDatabase';
import CompleteDatabase from '../views/Admin/LoadFiles/CompleteDatabase';

import InitWallet from '../views/Admin/Taxes/InitWallet';
import WalletByYear from '../views/Admin/Taxes/WalletByYear';

import Help from '../views/Admin/Help';

import Debug from '../views/Admin/Debug';

/********** [ PROPERTIES ] ****************/


/*********** [ COMPONENT ] ****************/
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/admin/files/load" />} />
                <Route path="/admin/files/load" element={<LoadFiles />} />
                <Route path="/admin/files/control" element={<ControlFiles />} />
                <Route path="/admin/database/check" element={<ControlDatabase />} />
                <Route path="/admin/database/complete" element={<CompleteDatabase />} />
                <Route path="/admin/taxes/init" element={<InitWallet />} />
                <Route path="/admin/taxes/stateByYear" element={<WalletByYear />} />
                <Route path="/admin/help" element={<Help />} />
                <Route path="/admin/debug" element={<Debug />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;