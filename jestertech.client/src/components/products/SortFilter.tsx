import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetProductCategories } from "../../hooks/useQueries/useProductQueries";
import Button from "../ui/Button";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSearchParams } from "react-router";


function SortFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [toggleSortFilter, setToggleSortFilter] = useState(false);
    const { data: Categories } = useGetProductCategories();
    const sort = ["name", "price", "new", "old"]

    const currentCategories = searchParams.getAll("categories");

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
      <div className="sortFilter-Container">
          <Button className="sortFilter-btn"
              onClick={() => setToggleSortFilter(s => !s)}>
              <FontAwesomeIcon className="sortFilter-icon"
                  icon={faEllipsisVertical} />
          </Button>
          {
              toggleSortFilter &&
              <div className="sortFilter" id="sortFilter-field">
                  <form
                      className="sortForm"
                      onSubmit={handleSortFilter}
                  >
                      <h4>Sort by: </h4>
                      <div className="sortForm-inputs">
                          {
                              sort.map((s: string, index: number) => (
                                  <label htmlFor={s}
                                      key={index}>{s.charAt(0).toUpperCase() + s.slice(1)}
                                      <input type="radio"
                                          name="sort"
                                          id={s}
                                          value={s}
                                          defaultChecked={searchParams.get("sort") === s}
                                      />
                                  </label>
                              ))
                          }
                      </div>

                      <h4>Filter by:</h4>
                      <div className="filterForm">
                          {
                              Categories &&
                              Categories.map((c: string, index: number) => (
                                  <label key={index}>
                                      <input type="checkbox" name="categories" id={c}
                                          value={c}
                                          defaultChecked={currentCategories.includes(c)}
                                      /> {c}
                                  </label>
                              ))
                          }

                      </div>

                      <div className="sortFilter-btns">
                          <Button type="submit"
                              className="">
                              Submit
                          </Button>
                          <Button
                              className="closeSortFilter"
                              type="button"
                              onClick={() => setToggleSortFilter(t => !t)}
                          >
                              Cancel
                          </Button>
                      </div>
                  </form>
              </div>
          }
      </div>
  );
}

export default SortFilter;