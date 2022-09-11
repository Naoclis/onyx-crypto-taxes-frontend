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

import TaxesCalculationHelp from '../views/Admin/Taxes/Help';
import TaxesCalculation from '../views/Admin/Taxes/TaxesCalculation';
import OldAppTesting from '../views/Admin/Taxes/OldAppTesting';
import ExportLawyer from '../views/Admin/Taxes/ExportLawyer';

import SellOrders from '../views/Admin/TaxesDashboard/SellOrders';
import Valorizations from '../views/Admin/TaxesDashboard/Valorizations';
import Invests from '../views/Admin/TaxesDashboard/Invests';
import Taxes from '../views/Admin/TaxesDashboard/Taxes';

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

                <Route path="/taxes/help" element={<TaxesCalculationHelp />} />
                <Route path="/taxes/calculate" element={<TaxesCalculation />} />
                <Route path="/taxes/check" element={<OldAppTesting />} />
                <Route path="/taxes/export/uzan" element={<ExportLawyer />} />


                <Route path="/taxes/manage/sells" element={<SellOrders />} />
                <Route path="/taxes/manage/valorizations" element={<Valorizations />} />
                <Route path="/taxes/manage/invests" element={<Invests />} />
                <Route path="/taxes/manage/taxes" element={<Taxes />} />

                <Route path="/help" element={<Help />} />
                <Route path="/debug" element={<Debug />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;