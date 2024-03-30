import React, { useEffect, useState } from "react";
import { useSearch } from "./SearchContext/SearchContext";
import Alert from "../../components/alert/Alert";
function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const { search } = useSearch();
  const [results, setResults] = useState([{ name: "Muashir" }]);
  useEffect(() => {
    setSearchTerm(search);
  }, []);
  return (
    <>
      <div>
        <div className="bg-gray-400 w-full h-full flex flex-col items-center justify-center mb-4">
          {results.length ? (
            <Alert type="success" message="founded the result" />
          ) : (
            <Alert type="failure" message="can't founded any result.." />
          )}
          <div className="flex flex-row items-center m-2">
            <label htmlFor="searchInput" className="mr-2">
              You Search for:
            </label>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                id="searchInput"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="border border-gray-300 rounded px-2 py-1"
              />
            </form>

            {/* <div className="">
            {results?.map((item,index)=>{
                <div key={index}>

                </div>
            })}
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
