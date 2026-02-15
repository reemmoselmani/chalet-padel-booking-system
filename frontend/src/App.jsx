import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return(
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/register" style={{ margin: "0 10px" }}>Register</Link> | 
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path='/login' element = {<Login/>} />
        
      </Routes>
    </Router>


  );
 
}

export default App;