import React, { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import GlobalStyle from './GlobalStyle'
import Background from './components/Background'
import Header from './components/Header'
import Home from './components/Home'
import Wave from './components/Wave'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Background />
      <Header />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wave" element={<Wave />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
