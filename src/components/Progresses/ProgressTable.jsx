import React from "react";

const ProgressTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Arid-No</th>
            <th className="px-4 py-2">Attendance</th>
            <th className="px-4 py-2">Marks</th>
            <th className="px-4 py-2">Comments</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.aridNumber}</td>
                <td className="border px-4 py-2">{item.attendance}</td>
                <td className="border px-4 py-2">{item.marks}</td>
                <td className="border px-4 py-2">{item.comments}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressTable;
