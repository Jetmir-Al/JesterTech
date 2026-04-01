import './App.css';
import NavBar from './components/layout/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Footer from './components/layout/Footer';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import { AccountFormProvider } from './context/AccountFormProvider';


function App() {
    return (
        <Router>
            <AccountFormProvider>
                <NavBar />
            </AccountFormProvider>
            <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={< ></>} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;