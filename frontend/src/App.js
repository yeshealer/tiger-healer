import React, { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Icon } from '@iconify/react';
import GlobalStyle from './GlobalStyle'
import Background from './components/Background'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Background />
      <Header />
      <Suspense>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
