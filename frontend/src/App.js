import React, { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import GlobalStyle from './GlobalStyle'
import Background from './components/Background'
import Header from './components/Header'

function App() {
  const tigerWave = "0x00780C8645387f271fcE5A06C1E52606410Fc694"
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
