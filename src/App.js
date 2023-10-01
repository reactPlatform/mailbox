
import './App.css';
import RegisterForm from './components/registerForm';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    
      <Route path='/' element={<RegisterForm />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/login' element={<LoginForm />}/>
    
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
