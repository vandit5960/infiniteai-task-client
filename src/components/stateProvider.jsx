import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState("");

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, user, setUser }}
    >
      {children}
    </SearchContext.Provider>
  );
};
