import { createContext, useReducer } from "react";

type initialStateType = {
  searchTerm: string;
  searchFocus: boolean;
  searchHistory: {
    id: number;
    value: string;
  }[];
  searchAutocomplete: {
    id: number;
    value: string;
  }[];
  searchResults: string[];
};

const initialState: initialStateType = {
  searchTerm: "",
  searchFocus: false,
  searchHistory: [
    {
      id: 0,
      value: "",
    },
  ],
  searchAutocomplete: [
    {
      id: 0,
      value: "",
    },
  ],

  searchResults: [],
};

type SearchState = typeof initialState;
type SearchAction = {
  type: string;
  payload: any;
};

type SearchContextType = {
  state: SearchState;
  dispatch: (action: SearchAction) => void;
};

const reducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_SEARCH_FOCUS":
      return {
        ...state,
        searchFocus: action.payload,
      };
    case "SET_SEARCH_HISTORY":
      // check if the search term is already in the search history
      // if so, don't add it again
      if (state.searchHistory.some((entry) => entry.id === action.payload.id)) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        searchHistory: [...state.searchHistory, action.payload],
      };
    case "REMOVE_SEARCH_HISTORY":
      return {
        ...state,
        searchHistory: state.searchHistory.filter(
          (entry) => entry.id !== action.payload
        ),
      };
    case "SET_SEARCH_AUTOCOMPLETE":
      return {
        ...state,
        searchAutocomplete: action.payload,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export const SearchContext = createContext<SearchContextType>({
  state: initialState,
  dispatch: () => null,
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
