
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/login/LoginPage';
import { SectionPage } from './pages/SectionPage/SectionPage';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={<SectionPage />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;


// eslint-disable-next-line