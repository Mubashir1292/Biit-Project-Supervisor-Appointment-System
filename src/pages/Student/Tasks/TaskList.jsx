import React, { useEffect, useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import { Search } from "lucide-react";
import { Accordion } from "../../../components/SingleTask/Accordion";

function TaskList() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const allTaskList = [
      {
        title: "Code of Compiler",
        members: [
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
        ],
        date: "2024-04-01",
      },
      {
        title: "Code of Compiler",
        members: [
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
        ],
        date: "2024-04-01",
      },
      {
        title: "Code of Compiler",
        members: [
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
        ],
        date: "2024-04-01",
      },
    ];
    setAllTasks((prevTasks) => [...prevTasks, ...allTaskList]);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-center">
          <img src={BiitSAS} alt="BiitSAS" className="w-4/12" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold font-mono">Task List</h1>
        </div>
        <div className="bg-green-600 w-full justify-center p-2">
          <form
            action="#"
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-row justify-center items-center mb-4"
          >
            <input
              type="text"
              name="searchTask"
              id="searchTask"
              placeholder="Search"
              className="w-3/12 h-8 px-2 border border-gray-400 rounded-lg"
            />
            <Search className="-ml-7" />
          </form>
          <div className="overflow-auto h-96">
            {allTasks.map((item, index) => (
              <Accordion
                key={index}
                title={item.title}
                members={item.members}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskList;

// import React, { useEffect, useState } from "react";
// import BiitSAS from "../../../assets/extra/biitSAS.png";
// import { Search } from "lucide-react";
// import { Accordion } from "../../../components/SingleTask/Accordion";
// function TaskList() {
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const [allTasks, setAllTasks] = useState([]);
//   useEffect(() => {
//     const allTaskList = [
//       {
//         title: "Code of Compiler",
//         members: [
//           {
//             name: "Mubashir Liaqat",
//             status: "Completed",
//             marks: 9,
//           },
//           {
//             name: "Mubashir Liaqat",
//             status: "Completed",
//             marks: 9,
//           },
//           {
//             name: "Mubashir Liaqat",
//             status: "Completed",
//             marks: 9,
//           },
//         ],
//         date: "2024-04-01",
//       },
//       {
//         title: "Code of Compiler",
//         members: [
//           {
//             name: "Mubashir Liaqat",
//             status: "Completed",
//             marks: 9,
//           },
//           {
//             name: "Mubashir Liaqat",
//             status: "Completed",
//             marks: 9,
//           },
//           {
//             name: "Mubashir Liaqat",
//             status: "Completed",
//             marks: 9,
//           },
//         ],
//         date: "2024-04-01",
//       },
//       {
//         title: "Code of Compiler",
//         members: [
//           {
//             name: "Mubashir Liaqat",
//             status: "Completed",
//             marks: 9,
//           },
//           {
//             name: "Mubashir Liaqat",
//             status: "Completed",
//             marks: 9,
//           },
//           {
//             name: "Mubashir Liaqat",
//             status: "Completed",
//             marks: 9,
//           },
//         ],
//         date: "2024-04-01",
//       },
//     ];
//     setAllTasks((prevTasks) => [...prevTasks, ...allTaskList]);
//   }, []);
//   return (
//     <>
//       <div className="flex flex-col w-full">
//         <div className="flex justify-center">
//           <img src={BiitSAS} alt="BiitSAS" className="w-4/12" />
//         </div>
//         <div className="flex justify-center">
//           <h1 className="text-4xl font-bold font-mono">Task List</h1>
//         </div>
//         <div className="bg-green-600 w-full justify-center p-2">
//           <form
//             action="#"
//             onSubmit={(e) => e.preventDefault()}
//             className=" flex flex-row justify-center items-center mb-4"
//           >
//             <input
//               type="text"
//               name="searchTask"
//               id="searchTask"
//               placeholder="Search"
//               className="w-3/12 h-8 px-2 border border-gray-400 rounded-lg"
//             />
//             <Search className="-ml-7" />
//           </form>
//           <div className="overflow-auto h-full">
//             {allTasks.map((item, index) => (
//               <Accordion
//                 key={index}
//                 title={item.title}
//                 members={item.members}
//                 index={index}
//                 activeIndex={activeIndex}
//                 setActiveIndex={setActiveIndex}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default TaskList;
