import { useContext } from "react";
import { SearchContext } from "../context/searchContext";
import styles from "../styles/pages/Search.module.scss";
import { Input } from "../components/Input";
import { SearchHistory } from "../components/SearchHistory";
import { SearchSuggestions } from "../components/SearchSuggestions";
import OutsideClickHandler from "../utils/outsideClickHelper";

export const Search = () => {
  const { state, dispatch } = useContext(SearchContext);
  const { searchFocus, searchHistory } = state;
  const filteredSearchHistory = searchHistory.filter(
    (entry) => entry.value !== ""
  );

  const handleOutsideClick = () => {
    // Handle the outside click event (e.g., close the dropdown)
    dispatch({ type: "SET_SEARCH_FOCUS", payload: false });
  };

  const handleInputClick = () => {
    // Handle the outside click event (e.g., close the dropdown)
    dispatch({ type: "SET_SEARCH_FOCUS", payload: true });
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Search X</h1>
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <div className={styles.search}>
            <Input onClick={handleInputClick} />
            {searchFocus && (
              <div className={styles.searchSuggestions}>
                {searchFocus && filteredSearchHistory.length > 0 && (
                  <SearchHistory />
                )}
                <SearchSuggestions />
              </div>
            )}
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};
