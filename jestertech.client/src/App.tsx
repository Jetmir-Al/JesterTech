import './App.css';
import NavBar from './components/layout/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Footer from './components/layout/Footer';
import Products from './pages/Products';


function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;