/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { createRoot } from 'react-dom/client';
/********* [ MY LIBRARIES ] ***************/
//Components
import App from './App';
/********** [ PROPERTIES ] ****************/

/*********** [ COMPONENT ] ****************/
const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);


