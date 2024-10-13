import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword'; 
import Dashboard from './pages/Dashboard'; 
import Classes from './pages/Classes'; // Add Classes component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/classes" element={<Classes />} /> {/* Add route for Classes */}
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
