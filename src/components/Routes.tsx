/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
/********* [ MY LIBRARIES ] ***************/
//Components
import LoadFiles from '../views/Admin/Load/LoadFiles';
import ControlFiles from '../views/Admin/Load/ControlFiles';
import ControlDatabase from '../views/Admin/Load/ControlDatabase';
import Help from '../views/Admin/Help';
import Debug from '../views/Admin/Debug';

/********** [ PROPERTIES ] ****************/


/*********** [ COMPONENT ] ****************/
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/admin/loadFiles" />} />
                <Route path="/admin/loadFiles" element={<LoadFiles />} />
                <Route path="/admin/controlFiles" element={<ControlFiles />} />
                <Route path="/admin/controlDatabase" element={<ControlDatabase />} />
                <Route path="/admin/help" element={<Help />} />
                <Route path="/admin/debug" element={<Debug />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;