import { useContext } from "react";
import { SearchContext } from "../context/searchContext";
import styles from "../styles/components/SearchHistoryItem.module.scss";

type SearchHistoryItemProps = {
  id: number;
  value: string;
  icon: React.ReactNode;
};

export const SearchHistoryItem = ({
  id,
  value,
  icon,
}: SearchHistoryItemProps) => {
  const { dispatch } = useContext(SearchContext);

  const handleClick = () => {
    // redirect to search results page
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "REMOVE_SEARCH_HISTORY", payload: id });
  };

  return (
    <div
      className={styles.SearchHistoryItem}
      onClick={() => {
        handleClick();
      }}
    >
      <div>{icon}</div>
      <div>
        <p>{value}</p>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
