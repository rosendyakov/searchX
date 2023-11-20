import { useContext } from "react";
import { SearchContext } from "../context/searchContext";
import { SearchHistoryItem } from "./SearchHistoryItem";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const SearchHistory = () => {
  const { state } = useContext(SearchContext);
  const { searchHistory } = state;

  const filteredSearchHistory = searchHistory.filter(
    (entry) => entry.value !== ""
  );

  return (
    <div>
      {filteredSearchHistory.map((item) => {
        return (
          <SearchHistoryItem
            key={item.id}
            id={item.id}
            value={item.value}
            icon={<AccessTimeIcon />}
          />
        );
      })}
    </div>
  );
};
