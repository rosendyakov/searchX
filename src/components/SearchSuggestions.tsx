import { useContext, useEffect } from "react";
import { SearchContext } from "../context/searchContext";
import searchData from "../data/searchData.json";
import SearchIcon from "@mui/icons-material/Search";
import { SearchSuggestionItem } from "./SearchSuggestionItem";

export const SearchSuggestions = () => {
  const { searchSuggestions } = searchData;
  const { state, dispatch } = useContext(SearchContext);
  const { searchTerm, searchAutocomplete } = state;

  useEffect(() => {
    const filterSuggestions = () => {
      const filteredSuggestions = searchSuggestions.filter((suggestion) => {
        return suggestion.value
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      dispatch({
        type: "SET_SEARCH_AUTOCOMPLETE",
        payload: filteredSuggestions,
      });
    };

    filterSuggestions();
  }, [dispatch, searchSuggestions, searchTerm]);

  return (
    <div>
      {searchTerm.length > 0 && (
        <div>
          {searchAutocomplete.slice(0, 10).map((suggestion) => {
            return (
              <SearchSuggestionItem
                icon={<SearchIcon />}
                key={suggestion.id}
                id={suggestion.id}
                value={suggestion.value}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
