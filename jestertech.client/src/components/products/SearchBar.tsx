import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router";

function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get("search") as string;

        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            if (search) params.set("search", search);
            else params.delete("search");
            params.set("page", "1");
            return params;
        });
    };
    return (
        <form className="productSearch-form" onSubmit={handleSubmit}>
            <FontAwesomeIcon
                className="search__icon"
                icon={faMagnifyingGlass} />
            <input type="text"
                placeholder="What are you looking?"
                className="search-input"
                name="search"
                defaultValue={searchParams.get("search") || ""}
            />
        </form>
    );
}

export default SearchBar;