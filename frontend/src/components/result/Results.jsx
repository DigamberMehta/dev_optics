import React from "react";
import OpticsCards from "./OpticsCards";
import FilterSidebar from "./FilterSidebar";

const Results = () => {
  return (
    <div  className="flex pt-[100px]">
      <div className="hidden md:block w-1/4 ">
        <FilterSidebar />
      </div>
      <div className="w-full md:w-3/4">
        <OpticsCards />
      </div>
    </div>
  );
};

export default Results;
