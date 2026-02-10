import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import CafeTemplate from './templates/CafeTemplate';
import CafeTemplatePro from './templates/CafeTemplatePro';
import CafeTemplatePro2 from './templates/CafeTemplatePro2';
import TravelTemplate from './templates/TravelTemplate';
import TravelTemplatePro from './templates/TravelTemplatePro';
import Drink from './templates/Drink';



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        {/* Navbar Global */}
        <Navbar />
        
        {/* Espaço para a navbar fixa */}
        <div className="pt-20"></div>

        {/* Rotas das Páginas */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/template/cafe" element={<CafeTemplate />} />
          <Route path="/template/cafepro" element={<CafeTemplatePro />} />
          <Route path="/template/cafepro2" element={<CafeTemplatePro2 />} />
          {/* Podemos adicionar mais templates depois */}
        
          <Route path="/template/viagens" element={<TravelTemplate />} />
          <Route path="/template/viagensPro" element={<TravelTemplatePro />} />
          <Route path="/template/drink" element={<Drink />} />

            <Route path="/template/:id" element={<CafeTemplate />} />
         
         
        </Routes>d

        {/* Footer Global */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;