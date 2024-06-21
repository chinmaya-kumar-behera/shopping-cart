// import React, { useState } from "react";

// const Accordion = ({ title, children }) => {
//   const [isActive, setIsActive] = useState(false);

//   const toggleAccordion = () => {
//     setIsActive(!isActive);
//   };

//   return (
//     <div className="w-full border-b border-gray-400 py-2">
//       <div
//         className={`cursor-pointer ${isActive ? "rounded-t-lg" : "rounded-lg"}`}
//         onClick={toggleAccordion}
//       >
//         <span>{title}</span>
//       </div>
//        <div
//         className={`overflow-hidden transition-all duration-700 ${
//           isActive ? "max-h-[1000px]" : "max-h-0 p-0"
//         }`}
//       >
//         <div className="rounded-b-lg">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Accordion;




import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const Accordion = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="w-full">{title}</div>
        <div className="text-gray-600 w-10 flex justify-center">
          {isActive ? <MdArrowDropUp /> : <MdArrowDropDown />}
        </div>
      </div>
      <div
        className={`${
          isActive ? "block" : "hidden"
        } px-4 py-3 border-t border-gray-300 transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;

