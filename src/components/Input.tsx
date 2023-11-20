import styles from "../styles/components/Input.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { useContext, useEffect, useRef } from "react";
import { SearchContext } from "../context/searchContext";

type InputProps = {
  onClick?: () => void;
};

export const Input = ({ onClick }: InputProps) => {
  const { state, dispatch } = useContext(SearchContext);
  const { searchTerm } = state;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current.focus();
    dispatch({ type: "SET_SEARCH_FOCUS", payload: true });
  }, []);

  const handleClear = () => {
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
  };

  return (
    <div className={styles.inputContainer} onClick={onClick}>
      <SearchIcon />
      <input
        value={searchTerm}
        onChange={(e) => {
          dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
        }}
        type="text"
        placeholder="Search..."
        className={styles.inputBar}
        ref={inputRef}
      />
      <div className={styles.actions}>
        {searchTerm.length > 0 && (
          <button onClick={handleClear} className={styles.clearButton}>
            <ClearIcon />
          </button>
        )}
        <KeyboardIcon />
        <KeyboardVoiceIcon />
      </div>
    </div>
  );
};
