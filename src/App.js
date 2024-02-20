import './App.css';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage'
import {Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/coins/:id" element={<CoinPage/>} />
      </Routes>
    </div>
  );
}

export default App;
