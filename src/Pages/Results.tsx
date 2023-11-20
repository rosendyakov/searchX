import { useContext, useEffect } from "react";
import { Input } from "../components/Input";
import { SearchHistory } from "../components/SearchHistory";
import { SearchSuggestions } from "../components/SearchSuggestions";
import styles from "../styles/pages/Results.module.scss";
import OutsideClickHandler from "../utils/outsideClickHelper";
import { SearchContext } from "../context/searchContext";
import { useParams } from "react-router-dom";
import searchData from "../data/searchData.json";
import { ResultsList } from "../components/ResultsList";

export const Results = () => {
  const { state, dispatch } = useContext(SearchContext);
  const { searchFocus, searchHistory } = state;

  const { searchSuggestions } = searchData;

  const { params } = useParams();

  const startTime = new Date().getTime(); // Record start time

  const filteredResults = searchSuggestions.filter((result) => {
    return result.value
      .toLowerCase() // str.split(" ")[0] to only search the first word so we get more results
      .includes(params.split(" ")[0].toLowerCase());
  });

  const endTime = new Date().getTime(); // Record end time

  const executionTime = endTime - startTime;

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

  useEffect(() => {
    dispatch({ type: "SET_SEARCH_FOCUS", payload: false });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Searching for "{params}"</h1>
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
        <div></div>
        <div className={styles.metadata}>
          <label>{filteredResults.length} results found</label>
          <label>({executionTime})</label>
        </div>
        <ResultsList results={filteredResults} />
      </div>
    </div>
  );
};
