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
import Chat from './components/Chat'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Background />
      <Header />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
