import './App.css';
import NavBar from './components/layout/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { NavbarUtilsProvider } from './context/NavbarUtilsProvider';

import Home from './pages/Home';
import Footer from './components/layout/Footer';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import ProductDetails from './components/products/ProductDetails';
import AlertBox from './components/ui/AlertBox';
import { useToggleAlertHook } from './hooks/useToggleAlert';


function App() {
    const { showAlert } = useToggleAlertHook();
    return (
        <Router>
            {
                showAlert === false &&
                <AlertBox
                    message="This is a test alert!"
                    type="error"
                />
            }
            <NavbarUtilsProvider>
                <NavBar />
            </NavbarUtilsProvider>
            <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart/>} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;