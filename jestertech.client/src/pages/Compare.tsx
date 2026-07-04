import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./pageStyles/compare.css";
import { GetAllProducts, getImageUrl } from "../api/productApi";
import Loading from "../utils/Loading";
import NoInfo from "../utils/NoInfo";
import { useGetProductCategories } from "../hooks/useQueries/useProductQueries";
import type { IProduct } from "../types/IProduct";
import AskAiDetails from "../components/ai/AskAiDetails";
import { useToggleAlertHook } from "../hooks/useToggle/useToggleAlert";

function Compare() {
    const { data: products, isLoading, isLoadingError } = useQuery({
        queryKey: ["allProducts"],
        queryFn: async () => {
            return await GetAllProducts();
        }
    });
    const { data: categories } = useGetProductCategories();
    const { setMessage, setShowAlert, setType } = useToggleAlertHook();
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
    const [askAi, setAskAi] = useState<boolean>(false);

    const filteredProducts = products?.filter((p: IProduct) => p.category === selectedCategory) || [];

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedProducts([]); 
        setAskAi(false);
    };

    const toggleProductSelection = (product: IProduct) => {
        if (selectedProducts.find(p => p.id === product.id)) {
            setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
        } else {
            if (selectedProducts.length >= 3) {
                setMessage("You can only select up to 3 products for comparison.");
                setType("warning");
                setShowAlert(true); 
                return;
            }
            setSelectedProducts([...selectedProducts, product]);
        }
        setAskAi(false);
    };

    return (
        <main className="compare-page-container">
            <div className="compare-main-content">
                <div className="compareForm-container">
                    <h3>Compare Products</h3>
                    {isLoading ? (
                        <Loading />
                    ) : products?.length === 0 || isLoadingError ? (
                        <NoInfo noInfo="No products as of this moment!" />
                    ) : (
                        <div className="categories-selector">
                            <select
                                name="category"
                                id="category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="" disabled>Select Category</option>
                                {categories?.map((category: string, index: number) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {selectedCategory && (
                    <div className="comparison-workspace">
                        <div className="products-selection-grid">
                            <h4>Select up to 3 products to compare:</h4>
                            <div className="selection-cards">
                                {filteredProducts.map((p: IProduct) => {
                                    const isSelected = selectedProducts.some(sp => sp.id === p.id);
                                    return (
                                        <div
                                            key={p.id}
                                            className={`selectable-card ${isSelected ? 'selected' : ''}`}
                                            onClick={() => toggleProductSelection(p)}
                                        >
                                            <img src={getImageUrl(p.image)} alt={p.title} />
                                            <h5>{p.title}</h5>
                                            <span>${p.price}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {selectedProducts.length >= 2 && (
                            <div className="comparison-table-wrapper">
                                <div className="table-header-actions">
                                    <h4>Technical Specifications Matrix</h4>
                                    <button
                                        className="ask-ai-compare-btn"
                                        onClick={() => setAskAi(true)}
                                    >
                                       Ask AI to Analyze Comparison
                                    </button>
                                </div>
                                <table className="compare-table">
                                    <thead>
                                        <tr>
                                            <th>Features</th>
                                            {selectedProducts.map(p => (
                                                <th key={p.id}>{p.title}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Price</strong></td>
                                            {selectedProducts.map(p => <td key={p.id} className="price-td">${p.price}</td>)}
                                        </tr>
                                        <tr>
                                            <td><strong>Brand</strong></td>
                                            {selectedProducts.map(p => <td key={p.id}>{p.brand}</td>)}
                                        </tr>
                                        <tr>
                                            <td><strong>Specifications</strong></td>
                                            {selectedProducts.map(p => (
                                                <td key={p.id} className="specs-td">
                                                    <pre>{p.specifications}</pre>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {askAi && (
                <div className="compare-ai-wrapper">
                    <AskAiDetails mode="compare"
                        setDisplay={() => setAskAi(false)}
                        ids={selectedProducts.map(p => p.id)}
                    />
                </div>
            )}
        </main>
    );
}

export default Compare;