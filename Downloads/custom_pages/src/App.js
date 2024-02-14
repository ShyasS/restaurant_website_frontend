import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import Header from './Layouts/Header/Header';
import Slider from './Components/Slider/Slider';
import MainPage from './Layouts/Main/MainPage';
import Home from './Pages/Homepage/Home';
import Footer from './Layouts/Footer/Footer';

function App() {
  return (
    <Router>
      <Header/>
        <Home/>
        <Footer/>
    </Router>
   
  );
}

export default App;
