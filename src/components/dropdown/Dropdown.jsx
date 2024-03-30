import Panel from "../panel/Panel";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useState, useEffect, useRef } from "react";
function Dropdown({ label, options, value, OnSelect, className, rest }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();
  // useRef is used for checking the location of the click ....
  useEffect(() => {
    // useEffect is used for just getting the checking the event.....
    const handler = (event) => {
      if (!divEl.current) {
        return;
        //checking is the list is open or close..
      }
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      } //checking if the dropdown list is open...
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
  const HandleClick = () => {
    setIsOpen(!isOpen);
  };
  const HandleOptionClick = (option) => {
    setIsOpen(false);
    // Clicking on any option will close the dropdown list...
    OnSelect(option);
    // this OnSelect will manage the newly selected item and change all the dropdown list...
  };
  const RenderedElements = options.map((option) => {
    return (
      <div key={option.label}>
        <div
          onClick={() => HandleOptionClick(option)}
          className="hover:bg-gray-300 flex justify-content rounded cursor-pointer border-b border-gray-400 mt-2"
        >
          {option.label}
        </div>
      </div>
    );
  });
  return (
    <div {...rest} ref={divEl} className={className}>
      <Panel
        onClick={HandleClick}
        className="flex justify-between px-2 text-xl mt-2 border-black border py-1 items-center  hover:bg-gray-50"
      >
        {value?.label || label}
        {isOpen ? (
          <GoChevronUp className="text-xl" />
        ) : (
          <GoChevronDown className="text-xl" />
        )}
      </Panel>
      {/* we are  */}
      {isOpen && (
        <Panel className="absolute w-full z-20 shadow-2xl py-1 px-0">
          {RenderedElements}
        </Panel>
      )}
      {/* This && operator will check the falsey value if not founded then it will share the last truethy value... */}
    </div>
  );
}
export default Dropdown;
// In this dropdown project we have done a lot of work like we created the an array of objects and then we created the
