/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
/********* [ MY LIBRARIES ] ***************/
//Components
import LoadFilesHelp from '../views/Admin/LoadFiles/Help';
import LoadFiles from '../views/Admin/LoadFiles/ListFiles';
import ControlFiles from '../views/Admin/LoadFiles/ControlFiles';
import ControlDatabase from '../views/Admin/LoadFiles/ControlDatabase';
import CompleteDatabase from '../views/Admin/LoadFiles/CompleteDatabase';

import InitWallet from '../views/Admin/Taxes/InitWallet';
import WalletByYear from '../views/Admin/Taxes/WalletByYear';
import OrderComparison from '../views/Admin/Taxes/OrderComparison';
import WalletValuer from '../views/Admin/Taxes/WalletValuer';

import Dashboard from '../views/Admin/TaxesDashboard/Dashboard';

import Help from '../views/Admin/Help';

import Debug from '../views/Admin/Debug';

/********** [ PROPERTIES ] ****************/


/*********** [ COMPONENT ] ****************/
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="files/help" />} />
                <Route path="/files/help" element={<LoadFilesHelp />} />
                <Route path="/files/load" element={<LoadFiles />} />
                <Route path="/files/control" element={<ControlFiles />} />
                <Route path="/database/check" element={<ControlDatabase />} />
                <Route path="/database/complete" element={<CompleteDatabase />} />

                <Route path="/taxes/init" element={<InitWallet />} />
                <Route path="/taxes/prepare/wallet/stateByYear" element={<WalletByYear />} />
                <Route path="/taxes/check/wallet/compareStateByYear" element={<OrderComparison />} />
                <Route path="/taxes/evaluate/wallet" element={<WalletValuer />} />

                <Route path="/taxes/manage" element={<Dashboard />} />

                <Route path="/help" element={<Help />} />
                <Route path="/debug" element={<Debug />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;