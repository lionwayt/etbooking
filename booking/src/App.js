import React from 'react';
import Topnavbar from './components/topnavbar/topnavbar';
import './components/topnavbar/Topnavbar.css';
import Navbar from './components/navbar/Navbar';
import'./components/navbar/navbar.css';
import Header from './components/header/header';
import'./components/header/header.css';
import Home from './components/main/home';
import'./components/main/home.css';
import MailList from './components/mailList/MailList'
import Footer from './components/footer/footer';





function App() {
  return (
    <div className='body'>

    
      <Topnavbar/>
      <Header/>
      <Navbar/> 
      <Home/>
      <MailList/>
      <Footer/>

    </div>
  );
}

export default App;
