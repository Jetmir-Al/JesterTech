import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare, faTrashCan, faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useAuthHook } from "../hooks/useAuthHook";
import NotFound from "./NotFound";
import { useGetProductsAdvanced } from "../hooks/useQueries/useProductQueries";
import "./pageStyles/dashboard.css";
import { getImageUrl } from "../api/productApi";
import Button from "../components/ui/Button";
import { useState } from "react";
function Dashboard() {
    const { user } = useAuthHook();
    const [page, setPage] = useState<number>(1);

    const { data: productData, isLoading } = useGetProductsAdvanced({
        params: { pageSize: "30", page: page.toString() } 
    });

    if (user?.role !== "Admin") {
        return <NotFound />;
    }

    return (
        <div className="admin-dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-title-group">
                    <h1>Product Management</h1>
                    <p>Manage inventory, modify product information, or add new listings.</p>
                </div>
                <button className="admin-btn admin-btn-primary">
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Create Product</span>
                </button>
            </div>

            <div className="dashboard-card">
                {isLoading ? (
                    <div className="dashboard-loading">Loading inventory...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData?.data && productData.data.length > 0 ? (
                                    productData.data.map((product) => (
                                        <tr key={product.id}>
                                            <td className="product-id">#{product.id}</td>
                                            <td>
                                                <div className="product-cell-info">
                                                    {product.image && (
                                                        <img
                                                            src={getImageUrl(product.image)}
                                                            alt={product.title}
                                                            className="admin-product-thumb"
                                                        />
                                                    )}
                                                    <span className="product-name" title={product.title}>
                                                        {product.title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="category-badge">{product.category}</span>
                                            </td>
                                            <td className="product-price">${product.price.toFixed(2)}</td>
                                            <td>
                                                <span className={`stock-indicator ${product.quantity > 0 ? 'in-stock' : 'out-stock'}`}>
                                                    {product.quantity} left
                                                </span>
                                            </td>
                                            <td>
                                                <div className="admin-action-btns">
                                                    <button
                                                        className="action-btn edit-btn"
                                                        title="Edit Product"
                                                        onClick={() => console.log('Edit', product.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </button>
                                                    <button
                                                        className="action-btn delete-btn"
                                                        title="Delete Product"
                                                        onClick={() => console.log('Delete', product.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className="pageNumbers-container">
                <div className="pageNumbers">
                    <Button
                        type="button"
                        className="arrowBtn"
                        disabled={page <= 1}
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    >
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </Button>
                    {
                        Array.from({ length: productData?.totalPages || 1 }, (_, index) => (
                            <Button
                                key={index}
                                type="button"
                                className={`pageLink ${page === index + 1 ? 'active' : ''}`}
                                onClick={() => setPage(index + 1)}  
                            >
                                {index + 1}
                            </Button>
                        ))
                    }
                    <Button
                        type="button"
                        className="arrowBtn"
                        disabled={page >= (productData?.totalPages || 1)}
                        onClick={() => setPage(prev => Math.min(prev + 1, productData?.totalPages || 1))}
                    >
                        <FontAwesomeIcon icon={faCaretRight} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


