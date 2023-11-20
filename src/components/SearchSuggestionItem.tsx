import { useContext } from "react";
import { SearchContext } from "../context/searchContext";
import styles from "../styles/components/SearchSuggestionItem.module.scss";
import { useNavigate } from "react-router-dom";

type SearchSuggestionItemProps = {
  id: number;
  value: string;
  icon: React.ReactNode;
};

export const SearchSuggestionItem = ({
  id,
  value,
  icon,
}: SearchSuggestionItemProps) => {
  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();

  const handleClick = (id: number, value: string) => {
    dispatch({ type: "SET_SEARCH_HISTORY", payload: { id, value } });
    navigate("/results/" + value);
  };

  return (
    <div
      className={styles.SearchSuggestionItem}
      onClick={() => {
        handleClick(id, value);
      }}
    >
      <div>{icon}</div>
      <div>
        <p>{value}</p>
      </div>
    </div>
  );
};
