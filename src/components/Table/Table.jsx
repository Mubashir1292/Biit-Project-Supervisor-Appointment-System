import React, { useState } from "react";
const Table = ({ data, handleSelect }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="overflow-x-auto w-10/12 flex justify-center items-center">
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-2 py-1 text-xs font-semibold text-center">
              Title
            </th>
            <th className="px-2 py-1 text-xs font-semibold text-center">
              Supervisor
            </th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            <>
              {data.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <tr
                    key={index}
                    className={
                      ("hover:bg-gray-200",
                      isActive
                        ? "bg-gray-100 cursor-pointer hover:shadow-xl"
                        : "bg-white cursor-pointer hover:shadow-xl hover:bg-gray-300")
                    }
                    onClick={() => {
                      setActiveIndex(index);
                      handleSelect(item);
                    }}
                  >
                    <td
                      className={`px-2 py-1 text-xs ${
                        isActive ? "font-semibold text-xs" : ""
                      }`}
                    >
                      {item?.title}
                    </td>
                    <td
                      className={`px-2 py-1 text-xs ${
                        isActive ? "font-semibold text-xs" : ""
                      }`}
                    >
                      {item?.username}
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
