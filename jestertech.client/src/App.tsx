import './App.css';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { NavbarUtilsProvider } from './context/NavbarUtilsProvider';
import { useToggleAlertHook } from './hooks/useToggle/useToggleAlert';
import { lazy } from 'react';
import AlertBox from './components/ui/AlertBox';
import ProtectedRoutes from './routes/ProtectedRoutes';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Cart = lazy(() => import('./pages/Cart'));
const ProductDetails = lazy(() => import('./components/products/ProductDetails'));
const Profile = lazy(() => import('./pages/Profile'));
const Compare = lazy(() => import('./pages/Compare'));
const Dashboard = lazy(() => import('./pages/Dashboard'));


function App() {
    const { showAlert, message, type } = useToggleAlertHook();
    return (
        <Router>
            {
                showAlert &&
                <AlertBox
                    message={message}
                    type={type}
                />
            }
            <NavbarUtilsProvider>
                <NavBar />
            </NavbarUtilsProvider>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/compare" element={<Compare />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route element={<ProtectedRoutes allowedRoles="Admin" />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

            </Routes>
            <Footer />
        </Router>
    );
}

export default App;