import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home';
import LginForm from './page/LginForm';
import Main from './page/Main';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='loginform/' element={<LginForm/>} />
        <Route path='main/' element={<Main/>} />
      </Routes>
    </div>
  );
}

export default App;
