import './styles.scss';

import Menu from './Menu/Menu';
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';

import {BrowserRouter as Router, Route, Routes} 
from 'react-router-dom';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Menu/>
      <Hero></Hero>
      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}> </Route>
          <Route path="/" element={<HomePage/>}></Route>
        </Routes>
      </div>
      
      <Footer></Footer>
    </Router>
  );
}

export default App;
