/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
/********* [ MY LIBRARIES ] ***************/
//Components
import LoadFiles from '../views/Admin/LoadFiles/ListFiles';
import ControlFiles from '../views/Admin/LoadFiles/ControlFiles';
import ControlDatabase from '../views/Admin/LoadFiles/ControlDatabase';
import Help from '../views/Admin/Help';
import Debug from '../views/Admin/Debug';

/********** [ PROPERTIES ] ****************/


/*********** [ COMPONENT ] ****************/
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/admin/load/loadFiles" />} />
                <Route path="/admin/load/loadFiles" element={<LoadFiles />} />
                <Route path="/admin/load/controlFiles" element={<ControlFiles />} />
                <Route path="/admin/load/controlDatabase" element={<ControlDatabase />} />
                <Route path="/admin/help" element={<Help />} />
                <Route path="/admin/debug" element={<Debug />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;