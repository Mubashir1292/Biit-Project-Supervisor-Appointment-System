import React, { useState } from "react";

const Table = ({ data, handleSelect }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="overflow-x-auto w-3/12 ">
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Supervisor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <tr
                key={index}
                className={
                  isActive
                    ? "bg-gray-100 cursor-pointer hover:shadow-xl hover:underline"
                    : "bg-white cursor-pointer hover:shadow-xl hover:underline"
                }
                onClick={() => {
                  setActiveIndex(index);
                  handleSelect(item);
                }}
              >
                <td className={`px-4 py-2 ${isActive ? "font-bold" : ""}`}>
                  {item.title}
                </td>
                <td className={`px-4 py-2 ${isActive ? "font-bold" : ""}`}>
                  {item.supervisor}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
