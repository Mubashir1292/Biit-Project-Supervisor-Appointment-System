import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const updateSearch = (value) => {
    setSearch(value);
  };

  return (
    <SearchContext.Provider value={{ search, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
