import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './Login/LoginPage';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { Register } from './Login/RegisterPage';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />}/>
        </Routes>
        </BrowserRouter>
      <ToastContainer />

    </div>
  );
}

export default App;
