import { ChevronDown, ChevronUp } from "lucide-react";

export const Accordion = ({
  title,
  members,
  index,
  activeIndex,
  setActiveIndex,
}) => {
  const handleClick = () => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="flex justify-between rounded-lg w-6/12 items-center bg-gray-100 p-3 cursor-pointer border-b border-gray-200"
        onClick={handleClick}
      >
        <div className="text-lg font-semibold">{title}</div>
        <div className="accordion-icon transition-transform ease-in-out">
          {index === activeIndex ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      {index === activeIndex && (
        <div className="accordion-content p-3 bg-gray-50 w-6/12 rounded-md transition-all ease-in-out duration-300">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, memberIndex) => (
                <tr key={memberIndex} className="border-b border-gray-300">
                  <td className="px-4 py-2">{member.name}</td>
                  <td className="px-4 py-2">{member.status}</td>
                  <td className="px-4 py-2">{member.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// import { ChevronDown, ChevronUp } from "lucide-react";

// export const Accordion = ({
//   title,
//   content,
//   index,
//   activeIndex,
//   setActiveIndex,
// }) => {
//   const handleClick = () => {
//     setActiveIndex(index === activeIndex ? -1 : index);
//   };
//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div
//         className="flex justify-between rounded-lg w-6/12 items-center bg-gray-100 p-3 cursor-pointer border-b border-gray-200"
//         onClick={handleClick}
//       >
//         <div className="text-lg font-semibold ">{title}</div>
//         <div className="accordion-icon  transition-transform ease-in-out">
//           {index === activeIndex ? <ChevronUp /> : <ChevronDown />}
//         </div>
//       </div>
//       {index === activeIndex && (
//         <div className="accordion-content p-3 bg-gray-50 w-6/12 rounded-md transition-all ease-in-out duration-300">
//           {content.title}
//         </div>
//       )}
//     </div>
//   );
// };
