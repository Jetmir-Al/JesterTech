import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetProductCategories } from "../../hooks/useQueries/useProductQueries";
import Button from "../ui/Button";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";


function SortFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [toggleSortFilter, setToggleSortFilter] = useState(false);
    const { data: Categories } = useGetProductCategories();
    const sort = ["name", "price", "new", "old"]
    const currentCategories = searchParams.getAll("categories");
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setToggleSortFilter(false);
            }
        };

        if (toggleSortFilter) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [toggleSortFilter]);

    const handleSortFilter = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const sortValue = formData.get("sort");
        const selectedCategories = formData.getAll("categories");

        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set("page", "1");

            if (sortValue) params.set("sort", sortValue.toString());
            else params.delete("sort");

            params.delete("categories");
            selectedCategories.forEach(c => params.append("categories", c.toString()));
            return params;
        });
        setToggleSortFilter(false);
    };
    return (

        <div className="sortFilter-Container"
            ref={dropdownRef}>
            <Button
                className="sortFilter-trigger-btn"
                onClick={() => setToggleSortFilter(s => !s)}
                aria-expanded={toggleSortFilter}
            >
                <FontAwesomeIcon className="sortFilter-icon" icon={faEllipsisVertical} />
                <span>Filters & Sort</span>
            </Button>

            {toggleSortFilter && (
                <div className="sortFilter-dropdown" id="sortFilter-field">
                    <form className="sortForm" onSubmit={handleSortFilter}>

                        {/* Section: Sort By */}
                        <div className="filter-section">
                            <h4>Sort by</h4>
                            <div className="sortForm-inputs">
                                {sort.map((s, index) => (
                                    <label className="radio-pill" htmlFor={s} key={index}>
                                        <input
                                            type="radio"
                                            name="sort"
                                            id={s}
                                            value={s}
                                            defaultChecked={searchParams.get("sort") === s}
                                        />
                                        <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <hr className="filter-divider" />

                        {/* Section: Filter By Categories (Scrollable) */}
                        <div className="filter-section">
                            <div className="filter-header-row">
                                <h4>Categories</h4>
                                {currentCategories.length > 0 && (
                                    <span className="filter-badge">{currentCategories.length} selected</span>
                                )}
                            </div>
                            <div className="filterForm-scrollable">
                                {Categories && Categories.map((c, index) => (
                                    <label className="checkbox-row" key={index}>
                                        <input
                                            type="checkbox"
                                            name="categories"
                                            id={c}
                                            value={c}
                                            defaultChecked={currentCategories.includes(c)}
                                        />
                                        <span className="checkbox-label">{c}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="sortFilter-btns">
                            <Button type="submit" className="apply-btn">
                                Apply Filters
                            </Button>
                            <Button
                                className="closeSortFilter"
                                type="button"
                                onClick={() => setToggleSortFilter(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SortFilter;