import React from "react";
import { useSearch } from "./SearchContext/SearchContext";
function Search() {
  const { search } = useSearch();
  console.log(search);
  return (
    <div>
      <h1>You Search : {search}</h1>
    </div>
  );
}

export default Search;
